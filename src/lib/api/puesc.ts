import type { 
  Sent100Declaration, 
  SentEditDeclaration, 
  SentStatusResponse,
  GusValidationResponse,
  PuescErrorResponse,
  PuescApiConfig 
} from '../../types';

// PUESC API Configuration
export const PUESC_CONFIG: PuescApiConfig = {
  baseUrl: import.meta.env.VITE_PUESC_API_URL || '/api/puesc', // Używamy proxy
  apiKey: import.meta.env.VITE_PUESC_API_KEY || '',
  environment: (import.meta.env.VITE_PUESC_ENVIRONMENT as 'test' | 'production') || 'test',
};

// PUESC API Client
class PuescApiClient {
  private config: PuescApiConfig;
  private baseHeaders: Record<string, string>;

  constructor(config: PuescApiConfig) {
    this.config = config;
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'X-Environment': config.environment,
      'X-API-Version': '1.0',
    };
  }

  // SENT 100 - Submit new declaration
  async submitSent100(declaration: Sent100Declaration): Promise<{ success: boolean; declaration_number?: string; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sent/100`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(declaration),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as PuescErrorResponse;
        throw new Error(errorData.error?.message || 'Failed to submit SENT 100 declaration');
      }

      return {
        success: true,
        declaration_number: data.declaration_number,
      };
    } catch (error) {
      console.error('SENT 100 submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // SENT EDIT - Edit existing declaration
  async submitSentEdit(editDeclaration: SentEditDeclaration): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sent/edit`, {
        method: 'PUT',
        headers: this.baseHeaders,
        body: JSON.stringify(editDeclaration),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as PuescErrorResponse;
        throw new Error(errorData.error?.message || 'Failed to submit SENT EDIT declaration');
      }

      return { success: true };
    } catch (error) {
      console.error('SENT EDIT submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get declaration status
  async getDeclarationStatus(declarationNumber: string): Promise<SentStatusResponse | { error: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sent/status/${declarationNumber}`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as PuescErrorResponse;
        throw new Error(errorData.error?.message || 'Failed to get declaration status');
      }

      return data as SentStatusResponse;
    } catch (error) {
      console.error('Get declaration status error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Validate NIP/REGON with GUS API
  async validateCompanyData(nip: string, regon?: string): Promise<GusValidationResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/gus/validate`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify({ nip, regon }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as PuescErrorResponse;
        throw new Error(errorData.error?.message || 'Failed to validate company data');
      }

      return data as GusValidationResponse;
    } catch (error) {
      console.error('Company validation error:', error);
      return {
        valid: false,
        errors: [{
          errorCode: 'VALIDATION_ERROR',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        }],
      };
    }
  }

  // Test API connection
  async testConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.config.baseUrl}/health`, {
        method: 'GET',
        headers: this.baseHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return { connected: true };
    } catch (error) {
      console.error('PUESC API connection test error:', error);
      
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Connection timed out - the server may be unavailable or your network connection is slow';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error - please check your internet connection and try again';
        } else {
          errorMessage = error.message;
        }
      }
      
      return {
        connected: false,
        error: errorMessage,
      };
    }
  }

  // Get API documentation
  async getApiDocumentation(): Promise<{ documentation?: any; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/docs`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as PuescErrorResponse;
        throw new Error(errorData.error?.message || 'Failed to get API documentation');
      }

      return { documentation: data };
    } catch (error) {
      console.error('Get API documentation error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Create and export API client instance
export const puescApi = new PuescApiClient(PUESC_CONFIG);

// Helper functions for SENT message formatting
export const createSent100Declaration = (data: any): Sent100Declaration => {
  return {
    messageHeader: {
      messageId: `SENT100_${Date.now()}`,
      messageType: 'SENT100',
      senderId: data.senderId || 'QUICKSENT',
      receiverId: data.receiverId || 'PUESC',
      messageDate: new Date().toISOString(),
      version: '1.0',
    },
    declaration: {
      declarationNumber: data.declaration_number,
      declarationDate: new Date().toISOString().split('T')[0],
      declarationType: 'INITIAL',
      status: 'DRAFT',
      sender: {
        entityType: data.sender.entityType || 'COMPANY',
        nip: data.sender.nip,
        regon: data.sender.regon,
        name: data.sender.name,
        address: {
          street: data.sender.address.street,
          buildingNumber: data.sender.address.buildingNumber,
          apartmentNumber: data.sender.address.apartmentNumber,
          postalCode: data.sender.address.postalCode,
          city: data.sender.address.city,
          country: data.sender.address.country,
        },
        contactPerson: data.sender.contactPerson,
        phone: data.sender.phone,
        email: data.sender.email,
      },
      receiver: {
        entityType: data.receiver.entityType || 'COMPANY',
        nip: data.receiver.nip,
        regon: data.receiver.regon,
        name: data.receiver.name,
        address: {
          street: data.receiver.address.street,
          buildingNumber: data.receiver.address.buildingNumber,
          apartmentNumber: data.receiver.address.apartmentNumber,
          postalCode: data.receiver.address.postalCode,
          city: data.receiver.address.city,
          country: data.receiver.address.country,
        },
        contactPerson: data.receiver.contactPerson,
        phone: data.receiver.phone,
        email: data.receiver.email,
      },
      transportDetails: {
        transportType: data.transport_details.type,
        vehicle: {
          registrationNumber: data.transport_details.vehicle.registrationNumber,
          vehicleType: data.transport_details.vehicle.type,
          capacity: data.transport_details.vehicle.capacity,
          capacityUnit: data.transport_details.vehicle.capacityUnit,
        },
        driver: {
          firstName: data.transport_details.driver.firstName,
          lastName: data.transport_details.driver.lastName,
          licenseNumber: data.transport_details.driver.licenseNumber,
          licenseType: data.transport_details.driver.licenseType,
          phone: data.transport_details.driver.phone,
          email: data.transport_details.driver.email,
        },
        route: {
          loadingPlace: data.transport_details.route.loadingPlace,
          unloadingPlace: data.transport_details.route.unloadingPlace,
          plannedDepartureDate: data.transport_details.route.plannedDepartureDate,
          plannedArrivalDate: data.transport_details.route.plannedArrivalDate,
        },
      },
      goods: {
        description: data.goods.description,
        quantity: data.goods.quantity,
        unit: data.goods.unit,
        value: data.goods.value,
        currency: data.goods.currency,
        customsValue: data.goods.customsValue,
        customsCurrency: data.goods.customsCurrency,
        commodityCode: data.goods.commodityCode,
        packagingType: data.goods.packagingType,
        numberOfPackages: data.goods.numberOfPackages,
      },
      additionalInfo: data.additionalInfo,
    },
  };
};

export const createSentEditDeclaration = (originalNumber: string, changes: any, reason: string): SentEditDeclaration => {
  return {
    messageHeader: {
      messageId: `SENTEDIT_${Date.now()}`,
      messageType: 'SENTEDIT',
      senderId: 'QUICKSENT',
      receiverId: 'PUESC',
      messageDate: new Date().toISOString(),
      version: '1.0',
    },
    editRequest: {
      originalDeclarationNumber: originalNumber,
      editReason: reason as any,
      editDescription: `Edit requested by QuickSent system`,
      changes: changes,
    },
  };
};

// GUS Validation function
export const validateGusData = async (nip?: string, regon?: string): Promise<GusValidationResponse> => {
  if (!nip && !regon) {
    return {
      valid: false,
      errors: [{
        errorCode: 'MISSING_DATA',
        errorMessage: 'Należy podać NIP lub REGON do walidacji',
      }],
    };
  }

  try {
    // Symulacja walidacji GUS
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Symulowane dane firmy
    const mockCompanyData = {
      valid: true,
      company: {
        name: 'Przykładowa Spółka z o.o.',
        nip: nip || '1234567890',
        regon: regon || '123456789',
        status: 'AKTYWNY',
        address: {
          street: 'ul. Przykładowa 123',
          buildingNumber: '123',
          apartmentNumber: '',
          postalCode: '00-001',
          city: 'Warszawa',
          country: 'PL',
        },
        contactPerson: 'Jan Kowalski',
        phone: '+48 123 456 789',
        email: 'kontakt@przykladowa.pl',
      },
      validationDate: new Date().toISOString(),
    };

    return mockCompanyData;
  } catch (error) {
    return {
      valid: false,
      errors: [{
        errorCode: 'VALIDATION_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Błąd podczas walidacji danych GUS',
      }],
    };
  }
}; 