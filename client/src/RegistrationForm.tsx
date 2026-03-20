import React from 'react'
import { useRegister } from './hooks/useRegister'

interface RegistrationFormProps {
  onToggleForm: () => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onToggleForm }) => {
  const {
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
  } = useRegister()

  return (
    <form onSubmit={handleRegister} className="w-full">
      {/* Username Field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-black">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          disabled={loading}
          className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50"
        />
      </div>

      {/* Birth Date Field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-black">Birth Date</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          disabled={loading}
          className="w-full p-4 rounded-xl bg-[#978A74] text-black border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50"
        />
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-black">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
          className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50"
        />
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-black">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={loading}
          className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50"
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-semibold p-4 bg-purple text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-6 hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>

      {/* Switch to Login */}
      <p className="text-center mb-4 text-black">
        Already have an account?
        <span
          onClick={onToggleForm}
          className="cursor-pointer underline ml-1 text-purple hover:text-header transition-colors duration-300"
        >
          Sign in
        </span>
      </p>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mt-4">
          <p className="text-center m-0">{error}</p>
        </div>
      )}
    </form>
  )
}

export default RegistrationForm
