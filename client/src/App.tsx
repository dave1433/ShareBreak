import heroImg from './assets/hero-img.jpg'
import bigLogo from './assets/Logo-big.png'
import crab from './assets/crab.png'
import jellyfish from './assets/jellyfish.png'
import shark from './assets/shark.png'
import whale from './assets/whale.png'
import octopus from './assets/octopus.png'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-bg font-sans text-center">
      {/* Header */}
      <header className="bg-header bg-opacity-40 flex justify-between items-center px-10 py-4">
        <img src={bigLogo} alt="Reset Logo" className="h-10 w-auto" />
        <Link to="/login">
          <button className="bg-border font-bold px-6 py-2 rounded-lg text-text transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg hover:scale-105">
            Login
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <section className="relative h-hero bg-cover bg-center" style={{backgroundImage: `url(${heroImg})`}}>
          {/* Vertical Gradient Overlay - from top to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-hero-start via-hero-mid to-transparent opacity-65"></div>
          
          {/* Hero Content - Left aligned */}
          <div className="relative z-10 flex flex-col justify-center h-full px-24">
            <h1 className="text-clamp-h1 font-heading font-bold text-white mb-6 text-left">
              Re:set
            </h1>
            <h2 className="text-white text-clamp-h2 leading-relaxed text-left">
              We're more connected than ever—and lonelier than ever.
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
        

      {/* Main Content Section */}
      <section className="bg-purple py-16 px-6 text-left">
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-clamp-base mb-8 leading-relaxed">
            You spend 8+ hours a day connected to screens—Slack, Jira, GitHub, Zoom—but how connected are you to the people beside you? Re:set is the first wellbeing companion that helps developers and tech teams step away from the desk together. Log your offline moments—a coffee run, a lunch walk, a game after work—earn badges for real connection, and watch your team's social health grow. Because the best fix for digital exhaustion isn't another notification. It's actually hanging out.
          </p>
          <Link to="/login">
            <button className="bg-border px-8 py-3 font-bold rounded-lg text-text transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
              Get started
            </button>
          </Link>
        </div>
      </section>

    {/* Blue Section with H2 and P stacked */}
    <section className="bg-header py-16 px-6">
      <div className="max-w-6xl mx-auto text-left">
        <h2 className="text-clamp-h2 font-heading font-bold text-white mb-6">
          Log activities
        </h2>
        <p className="text-white text-clamp-base leading-relaxed">
          Record your offline moments – a coffee run, a walk, a game with colleagues. One tap.
        </p>
      </div>
    </section>


    {/* Circles badges */}
    <section className="bg-border py-16 px-6">
      <div className="max-w-6xl mx-auto text-left">
        <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6">
          Earn badges
        </h2>
        <p className="text-text text-clamp-base leading-relaxed">
          Unlock fun rewards as you build streaks and try new ways to connect.
        </p>
        <div className="flex justify-between items-center gap-8 pt-10">
          <div className="w-24 h-24 rounded-full bg-bg overflow-hidden flex items-center justify-center">
            <img src={crab} alt="Team Player" className="w-full h-full object-cover" />
          </div>
          <div className="w-24 h-24 rounded-full bg-bg overflow-hidden flex items-center justify-center">
            <img src={jellyfish} alt="Social Butterfly" className="w-full h-full object-cover" />
          </div>
          <div className="w-24 h-24 rounded-full bg-bg overflow-hidden flex items-center justify-center">
            <img src={shark} alt="Streak Master" className="w-full h-full object-cover" />
          </div>
          <div className="w-24 h-24 rounded-full bg-bg overflow-hidden flex items-center justify-center">
            <img src={whale} alt="Wellness Guru" className="w-full h-full object-cover" />
          </div>
          <div className="w-24 h-24 rounded-full bg-bg overflow-hidden flex items-center justify-center">
            <img src={octopus} alt="Multitasker" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-bg">
        <div className="max-w-6xl mx-auto text-left">
          <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6">
            Turn offline moments into team momentum
          </h2>
          <p className="text-text text-clamp-base leading-relaxed">
            Re:set makes unplugging social, visible, and rewarding. Log simple activities like "walked with Maria" or "lunch away from desk" in seconds. Watch your personal streak grow and unlock badges—Trailblazer, Social Butterfly, Streak Master—that celebrate real-world connection. If your team opts in, you can see anonymised activity trends and gently nudge each other toward healthier habits. No surveillance. No shame. Just a little nudge to remember: you're humans first, developers second.
          </p>
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

export default App