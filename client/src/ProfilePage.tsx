import { useState } from 'react'
import { Link } from 'react-router-dom'
import bigLogo from './assets/Logo-big.png'
import loginLogo from './assets/logo-login.png'

function ProfilePage() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
    // For now, just redirect to home
    window.location.href = '/'
  }

  // Form state
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [birthday, setBirthday] = useState('1990-01-01')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving profile:', { name, email, birthday, oldPassword, newPassword, confirmPassword })
    // Add your save logic here
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-center">
      {/* Header */}
      <header className="bg-header bg-opacity-40 flex justify-between items-center px-10 py-4">
        <Link to="/">
          <img src={bigLogo} alt="Reset Logo" className="h-10 w-auto" />
        </Link>
        <button 
          onClick={handleLogout}
          className="bg-border font-bold px-6 py-2 rounded-lg text-text transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg hover:scale-105"
        >
          Logout
        </button>
      </header>

      {/* Hero Section - Simplified */}
      <section className="py-16 px-24">
        <div className="flex items-center justify-between gap-8">
          {/* Left Side - Logo (50%) */}
          <div className="w-1/2 flex justify-center">
            <img 
              src={loginLogo} 
              alt="Reset Logo" 
              className="w-64 h-auto animate-slide-in-left-simple"
            />
          </div>
          
          {/* Right Side - Profile Info Card (50%) */}
          <div className="w-1/2">
            <div className="bg-header rounded-3xl p-12 shadow-lg">
              <h1 className="text-5xl font-heading font-bold text-white mb-6">
                Re:set
              </h1>
              <p className="text-white text-2xl">
                Hello! {name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="py-16 px-6 bg-bg">
        <form onSubmit={handleSave} className="max-w-4xl mx-auto">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-text text-left">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name" 
              required 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-text text-left">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* Birthday Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-text text-left">Birthday</label>
            <input 
              type="date" 
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* Old Password Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-text text-left">Old Password</label>
            <input 
              type="password" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password" 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* New Password Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-text text-left">Enter New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password" 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-8">
            <label className="block mb-2 font-medium text-text text-left">Confirm Your New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password" 
              className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
            />
          </div>

          {/* Save Button */}
          <button 
            type="submit" 
            className="w-fit font-semibold p-4 bg-border text-text border-none rounded-xl cursor-pointer transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1"
          >
            Save
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-footer py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl font-heading font-bold text-white mb-8">
            Take a break. Share your progress.
          </h3>
          <div className="flex justify-between items-center space-x-8 text-white text-sm">
            <span>Privacy Policy</span>
            <span>© 2026 Re:set. All rights reserved</span>
            <span>Support Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage