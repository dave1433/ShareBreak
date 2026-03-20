/**
 * Custom hook for registration form logic
 * Separates form state management from UI rendering
 */

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseRegisterReturn {
  username: string;
  email: string;
  password: string;
  birthDate: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setBirthDate: (date: string) => void;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useRegister = (): UseRegisterReturn => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const { register, loading } = useAuth();

  const validateForm = (): boolean => {
    if (!username.trim()) {
      setLocalError('Username is required');
      return false;
    }
    if (!email.trim()) {
      setLocalError('Email is required');
      return false;
    }
    if (!password.trim()) {
      setLocalError('Password is required');
      return false;
    }
    if (!birthDate) {
      setLocalError('Birth date is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }

    // Password length check
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await register(username, email, password, birthDate);
      // Reset form on success
      setUsername('');
      setEmail('');
      setPassword('');
      setBirthDate('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setLocalError(message);
    }
  };

  return {
    username,
    email,
    password,
    birthDate,
    setUsername,
    setEmail,
    setPassword,
    setBirthDate,
    handleRegister,
    loading,
    error: localError,
  };
};

