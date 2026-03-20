interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <section className="py-16 px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-clamp-h2 font-heading font-bold text-text mb-4 text-left">
          Leaderboard – Compare with Friends
        </h2>
        <p className="text-text text-clamp-base mb-8 text-left">
          See how you stack up against your teammates
        </p>
        
        {/* Leaderboard Items */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div 
              key={entry.rank} 
              className="w-full p-4 rounded-xl bg-[#6CA3EB] bg-opacity-50 border-2 border-header text-text flex justify-between items-center"
            >
              <span className="font-bold text-lg">{entry.rank}</span>
              <span className="flex-1 text-center font-medium text-lg">{entry.name}</span>
              <span className="font-bold text-lg">{entry.points}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leaderboard