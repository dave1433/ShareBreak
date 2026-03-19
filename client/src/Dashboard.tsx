import { Link } from 'react-router-dom'
import dashboardImg from './assets/dasboard-img.jpg'
import bigLogo from './assets/Logo-big.png'

function Dashboard() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
    // For now, just redirect to home
    window.location.href = '/'
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

      {/* Hero Section */}
      <div className="relative">
        <section className="relative h-hero bg-cover bg-center" style={{backgroundImage: `url(${dashboardImg})`}}>
          {/* Vertical Gradient Overlay - from top to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-hero-start via-hero-mid to-transparent opacity-65"></div>
          
          {/* Hero Content - Left aligned */}
          <div className="relative z-10 flex flex-col justify-center h-full px-24">
            <h1 className="text-clamp-h1 font-heading font-bold text-white mb-6 text-left">
              Your Dashboard
            </h1>
            <h2 className="text-white text-clamp-h2 leading-relaxed text-left">
              Track your offline moments and team connections
            </h2>
          </div>
        </section>

        {/* Big Logo - Positioned absolutely on the right side */}
        <img 
          src={bigLogo} 
          alt="Reset Big Logo" 
          className="absolute right-28 top-1/2 -translate-y-1/2 w-96 h-auto animate-slide-in-left z-20 hidden lg:block" 
        />
      </div>

      {/* Dashboard Content */}
      

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

export default Dashboard