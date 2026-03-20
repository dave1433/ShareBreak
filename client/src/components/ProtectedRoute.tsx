import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center bg-accent">
        <div className="text-center">
          <p className="text-black text-lg mb-4">Loading...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto"></div>
        </div>
      </div>
    )
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

