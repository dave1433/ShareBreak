import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginLogo from './assets/logo-login.png'

function Login() {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null)

  // Login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Register state
  const [regUserName, setRegUserName] = useState('')
  const [regBirthDate, setRegBirthDate] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')

  const toggleForm = () => {
    setIsRegistering(!isRegistering)
    setAuthError('')
  }

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAuthError('')
    
    try {
      // Add your login logic here
      console.log('Login:', { email, password })
      
      // Simulated success
      setTimeout(() => {
        setIsLoggedIn(true)
        setCurrentUser({ email })
        setLoading(false)
        // Redirect to dashboard
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      setAuthError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAuthError('')
    
    try {
      // Add your register logic here
      console.log('Register:', { regUserName, regBirthDate, regEmail, regPassword })
      
      // Simulated success
      setTimeout(() => {
        setIsLoggedIn(true)
        setCurrentUser({ email: regEmail })
        setLoading(false)
        // Redirect to dashboard
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      setAuthError('Registration failed. Please try again.')
      setLoading(false)
    }
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
        
        {/* Login Form */}
        {!isRegistering ? (
          <form onSubmit={loginUser} className="w-full">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
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
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
              />
            </div>
            
            {/* Sign In Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full font-semibold p-4 bg-purple text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-6 hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
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
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={registerUser} className="w-full">
            {/* Username Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Username</label>
              <input 
                type="text" 
                value={regUserName}
                onChange={(e) => setRegUserName(e.target.value)}
                placeholder="Enter your username" 
                required 
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
              />
            </div>

            {/* Birth Date Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Birth Date</label>
              <input 
                type="date" 
                value={regBirthDate}
                onChange={(e) => setRegBirthDate(e.target.value)}
                required 
                className="w-full p-4 rounded-xl bg-[#978A74] text-black border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
              />
            </div>
            
            {/* Email Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Email</label>
              <input 
                type="email" 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-black">Password</label>
              <input 
                type="password" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Enter your password" 
                required 
                className="w-full p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
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
                onClick={toggleForm} 
                className="cursor-pointer underline ml-1 text-purple hover:text-header transition-colors duration-300"
              >
                Sign in
              </span>
            </p>
          </form>
        )}
        
        {/* Error Display */}
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mt-4">
            <p className="text-center m-0">{authError}</p>
          </div>
        )}
        
        {/* Success Display */}
        {isLoggedIn && (
          <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4 mt-4">
            <p className="text-center m-0">Logged in as: {currentUser?.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login