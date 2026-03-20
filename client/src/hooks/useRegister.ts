import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginClient, type RegisterRequestDto } from '../generated-ts-client'
import { extractUserIdFromToken } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5255'

interface UseRegisterReturn {
  username: string
  email: string
  password: string
  birthDate: string
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setBirthDate: (date: string) => void
  handleRegister: (e: React.FormEvent) => Promise<void>
  loading: boolean
  error: string | null
}

export const useRegister = (): UseRegisterReturn => {
  const navigate = useNavigate()
  const loginClient = useMemo(() => new LoginClient(API_BASE_URL), [])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const persistAuthData = (token: string) => {
    localStorage.setItem('token', token)
    sessionStorage.setItem('token', token)
    const derivedUserId = extractUserIdFromToken(token)
    if (derivedUserId) {
      localStorage.setItem('userId', derivedUserId)
      sessionStorage.setItem('userId', derivedUserId)
    }
  }

  const validateForm = (): boolean => {
    if (!username.trim()) {
      setError('Username is required')
      return false
    }
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!password.trim()) {
      setError('Password is required')
      return false
    }
    if (!birthDate) {
      setError('Birth date is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const payload: RegisterRequestDto = {
        name: username,
        email,
        password,
        birthday: birthDate,
      }
      const response = await loginClient.register(payload)

      if (!response?.token) {
        throw new Error('Registration succeeded but no access token was returned.')
      }

      persistAuthData(response.token)
      navigate('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

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
    error,
  }
}

