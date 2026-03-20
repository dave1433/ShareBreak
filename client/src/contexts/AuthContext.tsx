import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthContextType, AuthUser, AuthError } from '../types/auth';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      const authUser: AuthUser = {
        email: response.email,
        userName: response.userName,
        token: response.token,
        expiration: response.expiration,
      };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      localStorage.setItem('authToken', response.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError({ message, code: 'LOGIN_ERROR' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, birthday: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register({ name, email, password, birthday });
      const authUser: AuthUser = {
        email: response.email,
        userName: response.userName,
        token: response.token,
        expiration: response.expiration,
      };
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      localStorage.setItem('authToken', response.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError({ message, code: 'REGISTER_ERROR' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

