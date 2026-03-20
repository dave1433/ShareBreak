import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Dashboard from './Dashboard.tsx'
import ProfilePage from './ProfilePage.tsx'
import Badges from './Badges.tsx'

<Route path="/badges" element={<Badges />} />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/badges" element={<Badges />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)