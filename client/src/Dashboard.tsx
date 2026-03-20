import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dashboardImg from './assets/dasboard-img.jpg'
import bigLogo from './assets/Logo-big.png'
import ActiveChallenges, { type ActiveChallengeCard } from './components/ActiveChallenges'
import LatestChallenges from './components/LatestChallenges'
import Leaderboard from './components/Leaderboard'
import { getAllPendingChallenges, type ChallengeDto } from '../Api/ChallangesApi'
import { getCurrentUserId, clearAuthData } from './utils/auth'
import { apiGet } from './utils/api'
import type { FriendRequestDto } from './types/friends'

function Dashboard() {
  const navigate = useNavigate()
  const [pendingCount, setPendingCount] = useState(0)
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallengeCard[]>([])
  const [latestActivities, setLatestActivities] = useState<string[]>([])
  const [leaderboard] = useState<Array<{ rank: number; name: string; points: number }>>([])

  // Load friend requests
  const loadPendingRequests = useCallback(() => {
    apiGet<FriendRequestDto[]>('friends/requests')
      .then((reqs) => setPendingCount(reqs.length))
      .catch(() => setPendingCount(0))
  }, [])

  const handleLogout = () => {
    clearAuthData()
    navigate('/login', { replace: true })
  }

  // Load pending requests on mount
  useEffect(() => {
    loadPendingRequests()
  }, [loadPendingRequests])

  const refreshActiveChallenges = useCallback(async () => {
    try {
      const userId = getCurrentUserId()
      if (!userId) {
        console.warn('No userId available. Skipping active challenge fetch.')
        setActiveChallenges([])
        return
      }

      const active = await getAllPendingChallenges(userId)
      const mappedActive = (active ?? [])
        .map((challenge: ChallengeDto) => ({
          id: challenge.id ?? '',
          title: challenge.title ?? 'Untitled challenge',
          progress: challenge.isActive ? 'In progress' : 'Not started',
          timeLeft: challenge.endDate
            ? `Ends ${new Date(challenge.endDate).toLocaleDateString()}`
            : 'No end date',
          isCompleted: (challenge as { isCompleted?: boolean }).isCompleted ?? false
        }))
        .filter((challenge) => !challenge.isCompleted)

      setActiveChallenges(mappedActive)
    } catch (error) {
      console.error('Dashboard realtime fetch error:', error)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    if (!isMounted) return

    refreshActiveChallenges()
    const timer = window.setInterval(refreshActiveChallenges, 15000)

    return () => {
      isMounted = false
      window.clearInterval(timer)
    }
  }, [refreshActiveChallenges])

  const handleChallengeFinished = useCallback(
    (challenge: ActiveChallengeCard) => {
      const timestamp = new Date().toLocaleString()
      setLatestActivities((prev) => [`${challenge.title} completed ${timestamp}`, ...prev].slice(0, 6))
      refreshActiveChallenges()
    },
    [refreshActiveChallenges]
  )

  return (
    <div className="min-h-screen bg-bg font-sans text-center">
      {/* Header */}
      <header className="bg-header bg-opacity-40 flex justify-between items-center px-10 py-4">
        <Link to="/">
          <img src={bigLogo} alt="Reset Logo" className="h-10 w-auto" />
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/friends">
            <button className="relative bg-purple font-bold px-6 py-2 rounded-lg text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg">
              Friends
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-border font-bold px-6 py-2 rounded-lg text-text transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg hover:scale-105"
          >
            Logout
          </button>
        </div>
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
          
          <button className="bg-border font-bold px-8 py-3 rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
            Your Badges
          </button>
          
          <button className="bg-border font-bold px-8 py-3 rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
            Competition Page
          </button>
        </div>
      </section>

      {/* Components */}
      <ActiveChallenges
        challenges={activeChallenges}
        onChallengeActivated={refreshActiveChallenges}
        onChallengeFinished={handleChallengeFinished}
      />
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