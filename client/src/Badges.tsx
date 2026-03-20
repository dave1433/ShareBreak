import { Link } from 'react-router-dom'
import { useState } from 'react'
import bigLogo from './assets/Logo-big.png'
import loginLogo from './assets/logo-login.png'
import crab from './assets/crab.png'
import jellyfish from './assets/jellyfish.png'
import shark from './assets/shark.png'
import whale from './assets/whale.png'
import octopus from './assets/octopus.png'

function Badges() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
    // For now, just redirect to home
    window.location.href = '/'
  }

  const name = 'John Doe'

  // Badge data with icons and names
  const badgeIcons = [
    { id: 1, icon: crab, name: 'Team Player' },
    { id: 2, icon: jellyfish, name: 'Social Butterfly' },
    { id: 3, icon: shark, name: 'Streak Master' },
    { id: 4, icon: whale, name: 'Wellness Guru' },
    { id: 5, icon: octopus, name: 'Multitasker' }
  ]

  // Sample badge data - 12 badges total
  const badges = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    icon: index < 5 ? badgeIcons[index].icon : null,
    name: index < 5 ? badgeIcons[index].name : `Badge ${index + 1}`
  }))

  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

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

      {/* Badges Section */}
      <section className="py-16 px-6 bg-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6 text-left">
            Your Badges
          </h2>
          <p className="text-text text-clamp-base mb-8 leading-relaxed text-left">
            Collect badges as you complete challenges and build healthy offline habits.
          </p>
          
          {/* Badge Grid - 4 per row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className="relative flex flex-col items-center mb-8"
                onMouseEnter={() => setHoveredBadge(badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <div 
                  className="w-32 h-32 rounded-full bg-bg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden"
                >
                  {badge.icon ? (
                    <img 
                      src={badge.icon} 
                      alt={badge.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Empty circle for badges without icons
                    <div className="w-full h-full"></div>
                  )}
                </div>
                
                {/* Badge Name - Shows on hover */}
                {hoveredBadge === badge.id && badge.icon && (
                  <p className="absolute top-36 text-text text-sm font-medium whitespace-nowrap">
                    {badge.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
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

export default Badges