import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, UserSession, LoginCredentials, RegisterData } from '../types/user';
import { usersApi } from '../lib/api/users';

interface AuthContextType {
  user: User | null;
  session: UserSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sprawdź czy użytkownik jest zalogowany przy starcie aplikacji
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Sprawdź czy istnieje token w localStorage
        const savedSession = localStorage.getItem('quicksent_session');
        if (savedSession) {
          const parsedSession: UserSession = JSON.parse(savedSession);
          
          // Sprawdź czy sesja nie wygasła
          if (new Date(parsedSession.expiresAt) > new Date()) {
            setSession(parsedSession);
            
            // Pobierz dane użytkownika
            try {
              const userData = await usersApi.getUserById(parsedSession.userId);
              setUser(userData);
            } catch (error) {
              // Jeśli nie można pobrać danych użytkownika, usuń sesję
              localStorage.removeItem('quicksent_session');
              setSession(null);
            }
          } else {
            // Sesja wygasła
            localStorage.removeItem('quicksent_session');
          }
        }
      } catch (error) {
        console.error('Błąd podczas sprawdzania autentykacji:', error);
        localStorage.removeItem('quicksent_session');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const { user: userData, session: sessionData } = await usersApi.login(credentials);
      
      setUser(userData);
      setSession(sessionData);
      
      // Zapisz sesję w localStorage
      localStorage.setItem('quicksent_session', JSON.stringify(sessionData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (session) {
        await usersApi.logout(session.id);
      }
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem('quicksent_session');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await usersApi.register(data);
      
      // Po rejestracji automatycznie zaloguj użytkownika
      const { user: userData, session: sessionData } = await usersApi.login({
        email: data.email,
        password: data.password
      });
      
      setUser(userData);
      setSession(sessionData);
      localStorage.setItem('quicksent_session', JSON.stringify(sessionData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('Użytkownik nie jest zalogowany');
    }

    try {
      const updatedUser = await usersApi.updateUser(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!user) {
      return;
    }

    try {
      const userData = await usersApi.getUserById(user.id);
      setUser(userData);
    } catch (error) {
      console.error('Błąd podczas odświeżania danych użytkownika:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user && !!session,
    login,
    logout,
    register,
    updateUser,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 