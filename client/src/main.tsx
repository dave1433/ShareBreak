import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Friends from './Friends.tsx'
import Dashboard from './Dashboard.tsx'
import ProfilePage from './ProfilePage.tsx'
import { getToken } from './utils/auth'

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  return getToken() ? element : <Navigate to="/login" replace />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/badgesSection" element{</badgesSection>}/>
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/friends" element={<ProtectedRoute element={<Friends />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)