import { Link } from 'react-router-dom'
import dashboardImg from './assets/dasboard-img.jpg'
import bigLogo from './assets/Logo-big.png'
import ActiveChallenges from './components/ActiveChallenges'
import LatestChallenges from './components/LatestChallenges'
import Leaderboard from './components/Leaderboard'

function Dashboard() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
    // For now, just redirect to home
    window.location.href = '/'
  }

  // Sample data for active challenges
  const activeChallenges = [
    { title: "Walk & Talk", progress: "3/5 walks this week", timeLeft: "ends in 2 days" },
    { title: "Coffee Break Social", progress: "2/3 coffee breaks", timeLeft: "ends in 4 days" },
    { title: "Lunch Away", progress: "4/5 lunches away", timeLeft: "ends in 1 day" },
    { title: "Team Game Night", progress: "1/2 game sessions", timeLeft: "ends in 5 days" },
    { title: "Morning Stretch", progress: "6/7 stretches", timeLeft: "ends in 3 days" },
    { title: "Desk-Free Hour", progress: "2/5 hours tracked", timeLeft: "ends in 6 days" }
  ]

  // Sample data for latest activities
  const latestActivities = [
    "Mia started \"5K Steps Before Code\" – 2 hours ago",
    "Jake completed \"Coffee Break Social\" – 5 hours ago",
    "Emma joined \"Team Lunch Challenge\" – 1 day ago",
    "Alex earned \"Social Butterfly\" badge – 1 day ago"
  ]

  // Sample data for leaderboard
  const leaderboard = [
    { rank: 1, name: "Sarah", points: 450 },
    { rank: 2, name: "Mike", points: 420 },
    { rank: 3, name: "Emma", points: 385 },
    { rank: 4, name: "Jake", points: 360 },
    { rank: 5, name: "Mia", points: 340 },
    { rank: 6, name: "Alex", points: 315 }
  ]

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

      {/* Dashboard Navigation Section */}
      <section className="bg-purple py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-6 flex-wrap">
          <Link to="/profile">
            <button className="bg-border font-bold px-8 py-3 rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
              Profile Page
            </button>
          </Link>
          
          <Link to="/badges">
            <button className="bg-border font-bold px-8 py-3 rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
              Your Badges
            </button>
          </Link>
          
          <button className="bg-border font-bold px-8 py-3 rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
            Competition Page
          </button>
        </div>
      </section>

      {/* Components */}
      <ActiveChallenges challenges={activeChallenges} />
      <LatestChallenges activities={latestActivities} />
      <Leaderboard entries={leaderboard} />

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