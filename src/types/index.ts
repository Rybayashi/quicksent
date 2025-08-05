// User types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  company_id?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'manager' | 'operator' | 'viewer';

// Company types
export interface Company {
  id: string;
  name: string;
  nip: string;
  regon?: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// SENT types - Updated based on official PUESC specification
export interface SentDeclaration {
  id: string;
  declaration_number: string;
  status: SentStatus;
  sender_id: string;
  receiver_id: string;
  transport_type: TransportType;
  goods_description: string;
  quantity: number;
  unit: string;
  value: number;
  currency: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type SentStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'completed';
export type TransportType = 'road' | 'rail' | 'air' | 'sea' | 'inland_waterway';

// Contractor types
export interface Contractor {
  id: string;
  name: string;
  nip: string;
  regon?: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Location types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  description?: string;
  unit: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Vehicle types
export interface Vehicle {
  id: string;
  registration_number: string;
  type: VehicleType;
  capacity: number;
  driver_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type VehicleType = 'truck' | 'trailer' | 'van' | 'car';

// Driver types
export interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  license_number: string;
  license_type: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}

// Dashboard types
export interface DashboardStats {
  total_declarations: number;
  pending_declarations: number;
  approved_declarations: number;
  rejected_declarations: number;
  monthly_declarations: number;
  total_contractors: number;
  total_vehicles: number;
}

// Report types
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  parameters: Record<string, any>;
  generated_at: string;
  file_url?: string;
  status: 'pending' | 'completed' | 'failed';
}

export type ReportType = 'declarations' | 'contractors' | 'vehicles' | 'financial' | 'custom';

// PUESC API types - Updated based on official specification
export interface PuescApiConfig {
  baseUrl: string;
  apiKey: string;
  environment: 'test' | 'production';
}

// Legacy types for backward compatibility
export interface Sent100Message {
  declaration_number: string;
  sender: Contractor;
  receiver: Contractor;
  transport_details: {
    type: TransportType;
    vehicle: Vehicle;
    driver: Driver;
  };
  goods: {
    description: string;
    quantity: number;
    unit: string;
    value: number;
    currency: string;
  };
  additional_info?: Record<string, any>;
}

export interface SentEditMessage {
  original_declaration_number: string;
  changes: Partial<Sent100Message>;
  reason: string;
}

// Export PUESC types from dedicated file
export * from './puesc'; 