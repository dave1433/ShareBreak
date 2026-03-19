interface LatestChallengesProps {
  activities: string[];
}

function LatestChallenges({ activities }: LatestChallengesProps) {
  return (
    <section className="py-16 px-6 bg-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-clamp-h2 font-heading font-bold text-text mb-4 text-left">
          Latest Challenges
        </h2>
        <p className="text-text text-clamp-base mb-8 text-left">
          See what your team has been up to recently
        </p>
        
        {/* Latest Activities */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="w-full p-4 rounded-xl bg-purple bg-opacity-70 text-[#F5F0E9] text-left"
            >
              {activity}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestChallenges