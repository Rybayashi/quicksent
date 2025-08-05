// PUESC SENT Types based on official specification
// SENT_STK_w_5_01_20210118.pdf

// SENT 100 - Deklaracja przewozu
export interface Sent100Declaration {
  // Nagłówek komunikatu
  messageHeader: {
    messageId: string;
    messageType: 'SENT100';
    senderId: string;
    receiverId: string;
    messageDate: string; // ISO 8601 format
    version: string;
  };
  
  // Dane deklaracji
  declaration: {
    declarationNumber: string;
    declarationDate: string;
    declarationType: 'INITIAL' | 'CORRECTION' | 'CANCELLATION';
    status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
    
    // Dane nadawcy
    sender: {
      entityType: 'INDIVIDUAL' | 'COMPANY';
      nip?: string; // 10 cyfr
      regon?: string;
      name: string;
      address: {
        street: string;
        buildingNumber: string;
        apartmentNumber?: string;
        postalCode: string;
        city: string;
        country: string;
      };
      contactPerson?: string;
      phone?: string;
      email?: string;
    };
    
    // Dane odbiorcy
    receiver: {
      entityType: 'INDIVIDUAL' | 'COMPANY';
      nip?: string;
      regon?: string;
      name: string;
      address: {
        street: string;
        buildingNumber: string;
        apartmentNumber?: string;
        postalCode: string;
        city: string;
        country: string;
      };
      contactPerson?: string;
      phone?: string;
      email?: string;
    };
    
    // Szczegóły transportu
    transportDetails: {
      transportType: 'ROAD' | 'RAIL' | 'AIR' | 'SEA' | 'INLAND_WATERWAY';
      vehicle: {
        registrationNumber: string;
        vehicleType: 'TRUCK' | 'TRAILER' | 'VAN' | 'CAR';
        capacity: number;
        capacityUnit: string;
      };
      driver: {
        firstName: string;
        lastName: string;
        licenseNumber: string;
        licenseType: string;
        phone?: string;
        email?: string;
      };
      route: {
        loadingPlace: string;
        unloadingPlace: string;
        plannedDepartureDate: string;
        plannedArrivalDate: string;
      };
    };
    
    // Towary
    goods: {
      description: string;
      quantity: number;
      unit: string;
      value: number;
      currency: 'PLN' | 'EUR' | 'USD';
      customsValue?: number;
      customsCurrency?: string;
      commodityCode?: string; // CN code
      packagingType?: string;
      numberOfPackages?: number;
    };
    
    // Dodatkowe informacje
    additionalInfo?: {
      specialInstructions?: string;
      documents?: Array<{
        documentType: string;
        documentNumber: string;
        documentDate: string;
        documentIssuer: string;
      }>;
      references?: Array<{
        referenceType: string;
        referenceNumber: string;
        referenceDate?: string;
      }>;
    };
  };
}

// SENT EDIT - Edycja deklaracji
export interface SentEditDeclaration {
  messageHeader: {
    messageId: string;
    messageType: 'SENTEDIT';
    senderId: string;
    receiverId: string;
    messageDate: string;
    version: string;
  };
  
  editRequest: {
    originalDeclarationNumber: string;
    editReason: 'CORRECTION' | 'CANCELLATION' | 'COMPLETION';
    editDescription: string;
    changes: Partial<Sent100Declaration['declaration']>;
  };
}

// SENT Status Response
export interface SentStatusResponse {
  messageHeader: {
    messageId: string;
    messageType: 'SENTSTATUS';
    senderId: string;
    receiverId: string;
    messageDate: string;
    version: string;
  };
  
  statusInfo: {
    declarationNumber: string;
    status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
    statusDate: string;
    statusDescription?: string;
    errors?: Array<{
      errorCode: string;
      errorMessage: string;
      fieldName?: string;
    }>;
  };
}

// GUS Validation Response
export interface GusValidationResponse {
  valid: boolean;
  entityData?: {
    nip: string;
    regon?: string;
    name: string;
    address: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    registrationDate: string;
    lastUpdateDate: string;
  };
  errors?: Array<{
    errorCode: string;
    errorMessage: string;
  }>;
}

// PUESC API Error Response
export interface PuescErrorResponse {
  error: {
    code: string;
    message: string;
    details?: string;
    timestamp: string;
    requestId?: string;
  };
}

// Transport Type Enum
export type TransportType = 'ROAD' | 'RAIL' | 'AIR' | 'SEA' | 'INLAND_WATERWAY';

// Vehicle Type Enum
export type VehicleType = 'TRUCK' | 'TRAILER' | 'VAN' | 'CAR';

// Declaration Status Enum
export type DeclarationStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

// Entity Type Enum
export type EntityType = 'INDIVIDUAL' | 'COMPANY';

// Currency Enum
export type Currency = 'PLN' | 'EUR' | 'USD';

// Edit Reason Enum
export type EditReason = 'CORRECTION' | 'CANCELLATION' | 'COMPLETION'; 