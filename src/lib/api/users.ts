import type {
  User,
  LoginCredentials,
  RegisterData,
  PasswordReset,
  UserSession,
  ActivityLog,
  AuditTrail,
  UserStats,
  UserFilters,
  UserListResponse
} from '../../types/user';

// Konfiguracja API
const API_BASE_URL = '/api/users';

// Symulowane dane użytkowników
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@quicksent.pl',
    firstName: 'Jan',
    lastName: 'Kowalski',
    role: 'admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Jan+Kowalski&background=0D9488&color=fff',
    phone: '+48 123 456 789',
    companyId: '1',
    company: {
      id: '1',
      name: 'DB Schenker',
      nip: '1234567890',
      address: {
        street: 'ul. Przykładowa 1',
        city: 'Warszawa',
        postalCode: '00-001',
        country: 'Polska'
      },
      contact: {
        email: 'kontakt@dbschenker.pl',
        phone: '+48 22 123 45 67'
      },
      settings: {
        defaultCurrency: 'PLN',
        timezone: 'Europe/Warsaw',
        language: 'pl',
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      },
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z')
    },
    lastLoginAt: new Date('2024-01-15T10:30:00Z'),
    loginAttempts: 0,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    preferences: {
      language: 'pl',
      timezone: 'Europe/Warsaw',
      theme: 'light',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    permissions: {
      'users.manage': true,
      'users.view': true,
      'sent.create': true,
      'sent.edit': true,
      'sent.delete': true,
      'sent.view': true,
      'sent.approve': true,
      'data.manage': true,
      'data.import': true,
      'data.export': true,
      'reports.view': true,
      'reports.create': true,
      'audit.view': true,
      'settings.manage': true,
      'api.access': true,
      'notifications.send': true
    }
  },
  {
    id: '2',
    email: 'manager@quicksent.pl',
    firstName: 'Anna',
    lastName: 'Nowak',
    role: 'kierownik',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Nowak&background=3B82F6&color=fff',
    phone: '+48 987 654 321',
    companyId: '1',
    company: {
      id: '1',
      name: 'DB Schenker',
      nip: '1234567890',
      address: {
        street: 'ul. Przykładowa 1',
        city: 'Warszawa',
        postalCode: '00-001',
        country: 'Polska'
      },
      contact: {
        email: 'kontakt@dbschenker.pl',
        phone: '+48 22 123 45 67'
      },
      settings: {
        defaultCurrency: 'PLN',
        timezone: 'Europe/Warsaw',
        language: 'pl',
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      },
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z')
    },
    lastLoginAt: new Date('2024-01-14T15:45:00Z'),
    loginAttempts: 0,
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-14T15:45:00Z'),
    preferences: {
      language: 'pl',
      timezone: 'Europe/Warsaw',
      theme: 'auto',
      notifications: {
        email: true,
        sms: true,
        push: false
      }
    },
    permissions: {
      'users.view': true,
      'sent.create': true,
      'sent.edit': true,
      'sent.view': true,
      'data.manage': true,
      'reports.view': true,
      'audit.view': true
    }
  },
  {
    id: '3',
    email: 'operator@quicksent.pl',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    role: 'spedytor',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Piotr+Wiśniewski&background=10B981&color=fff',
    phone: '+48 555 123 456',
    companyId: '1',
    company: {
      id: '1',
      name: 'DB Schenker',
      nip: '1234567890',
      address: {
        street: 'ul. Przykładowa 1',
        city: 'Warszawa',
        postalCode: '00-001',
        country: 'Polska'
      },
      contact: {
        email: 'kontakt@dbschenker.pl',
        phone: '+48 22 123 45 67'
      },
      settings: {
        defaultCurrency: 'PLN',
        timezone: 'Europe/Warsaw',
        language: 'pl',
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      },
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z')
    },
    lastLoginAt: new Date('2024-01-15T08:20:00Z'),
    loginAttempts: 0,
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-15T08:20:00Z'),
    preferences: {
      language: 'pl',
      timezone: 'Europe/Warsaw',
      theme: 'dark',
      notifications: {
        email: false,
        sms: false,
        push: true
      }
    },
    permissions: {
      'sent.create': true,
      'sent.edit': true,
      'sent.view': true
    }
  }
];

// Symulowane sesje
const mockSessions: UserSession[] = [];

// Symulowane logi aktywności
const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Jan Kowalski',
    action: 'login',
    resource: 'auth',
    details: {},
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    success: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Anna Nowak',
    action: 'create',
    resource: 'sent',
    details: { declarationId: 'SENT-2024-001' },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T09:15:00Z'),
    success: true
  }
];

// Symulowane audyt
const mockAuditTrail: AuditTrail[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Jan Kowalski',
    action: 'create',
    tableName: 'users',
    recordId: '3',
    newValues: { email: 'operator@quicksent.pl', role: 'spedytor' },
    ipAddress: '192.168.1.100',
    timestamp: new Date('2024-01-03T00:00:00Z')
  }
];

class UsersApiClient {
  // private baseUrl: string;

  constructor(_baseUrl: string = API_BASE_URL) {
    // this.baseUrl = baseUrl;
  }

  // Autentykacja
  async login(credentials: LoginCredentials): Promise<{ user: User; session: UserSession }> {
    try {
      // Symulacja opóźnienia sieciowego
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === credentials.email);
      if (!user) {
        throw new Error('Nieprawidłowy email lub hasło');
      }

      // Symulacja weryfikacji hasła
      if (credentials.password !== 'password123') {
        throw new Error('Nieprawidłowy email lub hasło');
      }

      const session: UserSession = {
        id: `session_${Date.now()}`,
        userId: user.id,
        token: `token_${Math.random().toString(36).substr(2, 9)}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 godziny
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        createdAt: new Date(),
        isActive: true,
        lastActivity: new Date()
      };

      mockSessions.push(session);

      // Dodaj log aktywności
      mockActivityLogs.push({
        id: `log_${Date.now()}`,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        action: 'login',
        resource: 'auth',
        details: {},
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        timestamp: new Date(),
        success: true
      });

      return { user, session };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Błąd logowania');
    }
  }

  async logout(sessionId: string): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const sessionIndex = mockSessions.findIndex(s => s.id === sessionId);
      if (sessionIndex !== -1) {
        const session = mockSessions[sessionIndex];
        mockSessions.splice(sessionIndex, 1);

        // Dodaj log aktywności
        mockActivityLogs.push({
          id: `log_${Date.now()}`,
          userId: session.userId,
          userName: 'Użytkownik', // We don't have user info in session
          action: 'logout',
          resource: 'auth',
          details: {},
          ipAddress: session.ipAddress,
          userAgent: session.userAgent,
          timestamp: new Date(),
          success: true
        });
      }
    } catch (error) {
      throw new Error('Błąd podczas wylogowywania');
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Sprawdź czy użytkownik już istnieje
      if (mockUsers.find(u => u.email === data.email)) {
        throw new Error('Użytkownik z tym adresem email już istnieje');
      }

      // Username check removed as it's not part of the new User interface

      if (data.password !== data.confirmPassword) {
        throw new Error('Hasła nie są identyczne');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'klient', // Domyślna rola
        status: 'pending',
        phone: data.phone,
        loginAttempts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          language: 'pl',
          timezone: 'Europe/Warsaw',
          theme: 'light',
          notifications: {
            email: true,
            sms: false,
            push: false
          }
        },
        permissions: {
          'sent.view': true
        }
      };

      mockUsers.push(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Błąd rejestracji');
    }
  }

  async requestPasswordReset(data: { email: string }): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === data.email);
      if (!user) {
        // Nie ujawniamy czy użytkownik istnieje
        return;
      }

      // Symulacja wysłania emaila z linkiem do resetowania
      console.log(`Email z linkiem do resetowania hasła został wysłany na: ${data.email}`);
    } catch (error) {
      throw new Error('Błąd podczas wysyłania linku do resetowania hasła');
    }
  }

  async resetPassword(_data: PasswordReset): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Fix PasswordReset interface
      // if (data.newPassword !== data.confirmPassword) {
      //   throw new Error('Hasła nie są identyczne');
      // }

      // Symulacja weryfikacji tokenu i aktualizacji hasła
      console.log('Hasło zostało zaktualizowane');
    } catch (error) {
      throw new Error('Błąd podczas resetowania hasła');
    }
  }

  // Zarządzanie użytkownikami
  async getUsers(filters?: UserFilters, page: number = 1, limit: number = 10): Promise<UserListResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredUsers = [...mockUsers];

      // Filtrowanie
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.email.toLowerCase().includes(search) ||
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search)
        );
      }

      if (filters?.role) {
        filteredUsers = filteredUsers.filter(user => user.role === filters.role);
      }

      if (filters?.status) {
        filteredUsers = filteredUsers.filter(user => user.status === filters.status);
      }

      // TODO: Department filter removed as it's not part of the new User interface
      // if (filters?.department) {
      //   filteredUsers = filteredUsers.filter(user => user.department === filters.department);
      // }

      // Paginacja
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      return {
        users: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit)
      };
    } catch (error) {
      throw new Error('Błąd podczas pobierania listy użytkowników');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error('Użytkownik nie został znaleziony');
      }

      return user;
    } catch (error) {
      throw new Error('Błąd podczas pobierania danych użytkownika');
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockUsers.push(newUser);

      return newUser;
    } catch (error) {
      throw new Error('Błąd podczas tworzenia użytkownika');
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Użytkownik nie został znaleziony');
      }

      const oldUser = { ...mockUsers[userIndex] };
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
        updatedAt: new Date()
      };

      // Dodaj do audytu
      mockAuditTrail.push({
        id: `audit_${Date.now()}`,
        userId: '1', // ID aktualnego użytkownika
        userName: 'Administrator',
        action: 'update',
        tableName: 'users',
        recordId: id,
        oldValues: oldUser,
        newValues: mockUsers[userIndex],
        ipAddress: '192.168.1.100',
        timestamp: new Date()
      });

      return mockUsers[userIndex];
    } catch (error) {
      throw new Error('Błąd podczas aktualizacji użytkownika');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Użytkownik nie został znaleziony');
      }

      const deletedUser = mockUsers[userIndex];
      mockUsers.splice(userIndex, 1);

      // Dodaj do audytu
      mockAuditTrail.push({
        id: `audit_${Date.now()}`,
        userId: '1', // ID aktualnego użytkownika
        userName: 'Administrator',
        action: 'delete',
        tableName: 'users',
        recordId: id,
        oldValues: deletedUser,
        ipAddress: '192.168.1.100',
        timestamp: new Date()
      });
    } catch (error) {
      throw new Error('Błąd podczas usuwania użytkownika');
    }
  }

  // TODO: Fix UserPreferences interface
  // async updateUserPreferences(id: string, preferences: Partial<UserPreferences>): Promise<User> {
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 600));

  //     const userIndex = mockUsers.findIndex(u => u.id === id);
  //     if (userIndex === -1) {
  //       throw new Error('Użytkownik nie został znaleziony');
  //     }

  //     mockUsers[userIndex] = {
  //       ...mockUsers[userIndex],
  //       preferences: {
  //         ...mockUsers[userIndex].preferences,
  //         ...preferences
  //       },
  //       updatedAt: new Date()
  //     };

  //     return mockUsers[userIndex];
  //   } catch (error) {
  //     throw new Error('Błąd podczas aktualizacji preferencji');
  //   }
  // }

  // Statystyki
  async getUserStats(): Promise<UserStats> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const stats: UserStats = {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.status === 'active').length,
        inactiveUsers: mockUsers.filter(u => u.status === 'inactive').length,
        suspendedUsers: mockUsers.filter(u => u.status === 'suspended').length,
        pendingUsers: mockUsers.filter(u => u.status === 'pending').length,
        usersByRole: {
          admin: mockUsers.filter(u => u.role === 'admin').length,
          spedytor: mockUsers.filter(u => u.role === 'spedytor').length,
          kierowca: mockUsers.filter(u => u.role === 'kierowca').length,
          kierownik: mockUsers.filter(u => u.role === 'kierownik').length,
          audytor: mockUsers.filter(u => u.role === 'audytor').length,
          klient: mockUsers.filter(u => u.role === 'klient').length,
          support: mockUsers.filter(u => u.role === 'support').length
        },
        recentLogins: mockActivityLogs.filter(log => 
          log.action === 'login' && 
          new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length,
        failedLogins: 0 // Symulacja
      };

      return stats;
    } catch (error) {
      throw new Error('Błąd podczas pobierania statystyk');
    }
  }

  // Logi aktywności
  async getActivityLogs(userId?: string, page: number = 1, limit: number = 20): Promise<{
    logs: ActivityLog[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      let filteredLogs = [...mockActivityLogs];

      if (userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === userId);
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

      return {
        logs: paginatedLogs,
        total: filteredLogs.length,
        page,
        limit,
        totalPages: Math.ceil(filteredLogs.length / limit)
      };
    } catch (error) {
      throw new Error('Błąd podczas pobierania logów aktywności');
    }
  }

  // Audyt
  async getAuditTrail(resource?: string, page: number = 1, limit: number = 20): Promise<{
    audit: AuditTrail[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      let filteredAudit = [...mockAuditTrail];

      if (resource) {
        filteredAudit = filteredAudit.filter(audit => audit.tableName === resource);
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAudit = filteredAudit.slice(startIndex, endIndex);

      return {
        audit: paginatedAudit,
        total: filteredAudit.length,
        page,
        limit,
        totalPages: Math.ceil(filteredAudit.length / limit)
      };
    } catch (error) {
      throw new Error('Błąd podczas pobierania audytu');
    }
  }
}

// Eksport instancji klienta
export const usersApi = new UsersApiClient(); 