/**
 * Custom hook for login form logic
 * Separates form state management from UI rendering
 */

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseLoginReturn {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const { login, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Email and password are required');
      return;
    }

    try {
      await login(email, password);
      // Reset form on success
      setEmail('');
      setPassword('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setLocalError(message);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error: localError,
  };
};

