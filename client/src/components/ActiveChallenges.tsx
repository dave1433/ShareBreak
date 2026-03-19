interface Challenge {
  title: string;
  progress: string;
  timeLeft: string;
}

interface ActiveChallengesProps {
  challenges: Challenge[];
}

function ActiveChallenges({ challenges }: ActiveChallengesProps) {
  return (
    <section className="py-16 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-clamp-h2 font-heading font-bold text-text mb-4 text-left">
          Active Challenges
        </h2>
        <p className="text-text text-clamp-base mb-8 text-left">
          You're in the middle of these – keep going!
        </p>
        
        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-accent rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-heading font-bold text-black mb-3">
                {challenge.title}
              </h3>
              <p className="text-black text-base mb-2">
                {challenge.progress}
              </p>
              <p className="text-bg text-sm">
                {challenge.timeLeft}
              </p>
            </div>
          ))}
        </div>

        {/* Add Challenge Button */}
        <button className="font-semibold px-8 py-3 bg-border text-text border-none rounded-xl cursor-pointer transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1">
          Add a challenge
        </button>
      </div>
    </section>
  )
}

export default ActiveChallenges