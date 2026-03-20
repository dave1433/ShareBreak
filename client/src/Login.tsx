import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from './hooks/useLogin'
import RegistrationForm from './RegistrationForm'
import loginLogo from './assets/logo-login.png'

function Login() {
  const [isRegistering, setIsRegistering] = useState(false)
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading: loginLoading,
    error: loginError,
  } = useLogin()

  const toggleForm = () => {
    setIsRegistering(!isRegistering)
  }

  return (
    <div className="min-h-screen w-screen relative flex justify-center items-center p-4 bg-accent">
      {/* Login/Register Card */}
      <div className="relative z-10 bg-bg rounded-3xl p-8 w-full max-w-md shadow-lg">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="block w-fit mb-6 text-black no-underline hover:text-purple transition-colors duration-300"
        >
          ← Back to Home
        </Link>
        
        {/* Logo */}
        <img 
          src={loginLogo} 
          alt="Reset Logo" 
          className="block mx-auto mb-6 w-24 h-auto"
        />
        
        {/* Welcome Message */}
        <h2 className="text-center mb-8 font-heading font-semibold text-2xl text-black">
          {isRegistering ? 'Create your account' : 'Welcome back!'}
        </h2>
        
        {/* Forms */}
        {!isRegistering ? (
          <form onSubmit={handleLogin} className="w-full">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
                disabled={loginLoading}
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
                disabled={loginLoading}
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300 disabled:opacity-50"
              />
            </div>
            
            {/* Sign In Button */}
            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full font-semibold p-4 bg-purple text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-6 hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            {/* Switch to Register */}
            <p className="text-center mb-4 text-black">
              New? 
              <span 
                onClick={toggleForm} 
                className="cursor-pointer underline ml-1 text-purple hover:text-header transition-colors duration-300"
              >
                Register here
              </span>
            </p>

            {/* Error Display */}
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mt-4">
                <p className="text-center m-0">{loginError}</p>
              </div>
            )}
          </form>
        ) : (
          <RegistrationForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  )
}

export default Login