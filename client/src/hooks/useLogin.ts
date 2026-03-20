import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginClient, type LoginRequestDto } from '../generated-ts-client'
import { extractUserIdFromToken } from '../utils/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5255'

interface UseLoginReturn {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  handleLogin: (e: React.FormEvent) => Promise<void>
  loading: boolean
  error: string | null
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate()
  const loginClient = useMemo(() => new LoginClient(API_BASE_URL), [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      const payload: LoginRequestDto = { email, password }
      const response = await loginClient.login(payload)

      if (!response?.token) {
        throw new Error('Login succeeded but no access token was returned.')
      }

      persistAuthData(response.token)
      navigate('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error,
  }
}

