export type UserRole = 
  | 'admin'           // Administrator systemu
  | 'spedytor'        // Spedytor - może tworzyć i zarządzać zgłoszeniami
  | 'kierowca'        // Kierowca - może tylko przeglądać swoje zgłoszenia
  | 'kierownik'       // Kierownik - może zarządzać zespołem
  | 'audytor'         // Audytor - może przeglądać wszystkie dane
  | 'klient'          // Klient zewnętrzny - ograniczony dostęp
  | 'support';        // Wsparcie techniczne

export type UserStatus = 
  | 'active'          // Aktywny
  | 'inactive'        // Nieaktywny
  | 'suspended'       // Zawieszony
  | 'pending'         // Oczekujący na aktywację
  | 'blocked';        // Zablokowany

export type Permission = 
  | 'users.manage'           // Zarządzanie użytkownikami
  | 'users.view'             // Przeglądanie użytkowników
  | 'sent.create'            // Tworzenie zgłoszeń SENT
  | 'sent.edit'              // Edycja zgłoszeń SENT
  | 'sent.delete'            // Usuwanie zgłoszeń SENT
  | 'sent.view'              // Przeglądanie zgłoszeń SENT
  | 'sent.approve'           // Zatwierdzanie zgłoszeń SENT
  | 'data.manage'            // Zarządzanie danymi
  | 'data.import'            // Import danych
  | 'data.export'            // Eksport danych
  | 'reports.view'           // Przeglądanie raportów
  | 'reports.create'         // Tworzenie raportów
  | 'audit.view'             // Przeglądanie audytu
  | 'settings.manage'        // Zarządzanie ustawieniami
  | 'api.access'             // Dostęp do API
  | 'notifications.send';    // Wysyłanie powiadomień

export interface UserPermissions {
  [key: string]: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  lastActivity: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

export interface AuditTrail {
  id: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import';
  tableName: string;
  recordId: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Company {
  id: string;
  name: string;
  nip: string;
  regon?: string;
  krs?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  settings: {
    defaultCurrency: string;
    timezone: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermissions;
  companyId?: string;
  company?: Company;
  phone?: string;
  avatar?: string;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  preferences: {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface RoleDefinition {
  role: UserRole;
  name: string;
  description: string;
  permissions: Permission[];
  isDefault: boolean;
  canBeAssigned: boolean;
}

export interface LoginAttempt {
  id: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  timestamp: Date;
  errorMessage?: string;
}

export interface PasswordReset {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

// Legacy interfaces for backward compatibility
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  department?: string;
  position?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  pendingUsers: number;
  usersByRole: Record<UserRole, number>;
  recentLogins: number;
  failedLogins: number;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 