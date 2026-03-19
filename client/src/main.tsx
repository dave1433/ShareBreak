import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Friends from './Friends.tsx'
import { getToken } from './utils/auth'

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  return getToken() ? element : <Navigate to="/login" replace />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<ProtectedRoute element={<Friends />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)