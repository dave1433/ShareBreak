import {useEffect, useState} from 'react'
import {
  activateChallenge,
  finishChallenge,
  getAllPossibleChallenges,
  type ChallengeDto
} from '../../Api/ChallangesApi'
import { getCurrentUserId } from '../utils/auth'

export interface ActiveChallengeCard {
  id: string;
  title: string;
  progress: string;
  timeLeft: string;
  isCompleted?: boolean;
}
interface PossibleChallenge {
  id: string
  title: string
}

interface ActiveChallengesProps {
  challenges: ActiveChallengeCard[];
  onChallengeActivated?: () => void;
  onChallengeFinished?: (challenge: ActiveChallengeCard) => void;
}


function ActiveChallenges({ challenges, onChallengeActivated, onChallengeFinished }: ActiveChallengesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [possibleChallenges, setPossibleChallenges] = useState<PossibleChallenge[]>([])
  const [selectedChallengeId, setSelectedChallengeId] = useState('')
  const [finishingChallenge, setFinishingChallenge] = useState<string | null>(null)


  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedChallengeId('')
  }

  useEffect(() => {
    const loadPossibleChallenges = async () => {
      try {
        const data = await getAllPossibleChallenges()
        const normalized: PossibleChallenge[] = (data ?? [])
          .filter((challenge: ChallengeDto) => Boolean(challenge.id) && Boolean(challenge.title))
          .map((challenge: ChallengeDto) => ({
            id: challenge.id as string,
            title: challenge.title as string
          }))
        setPossibleChallenges(normalized)
      } catch (error) {
        console.error('Error loading possible challenges:', error)
      }
    }

    loadPossibleChallenges()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const userId = getCurrentUserId()
      if (!userId) {
        console.error('Cannot activate challenge without a userId.')
        return
      }

      await activateChallenge({
        userId,
        challengeId: selectedChallengeId
      })

      onChallengeActivated?.()

      closeModal()
    } catch (error) {
      console.error('Error activating challenge:', error)
    }
  }

  const handleFinishChallenge = async (challenge: ActiveChallengeCard) => {
    if (!challenge.id) return

    const userId = getCurrentUserId()
    if (!userId) {
      console.error('Cannot finish challenge without a userId.')
      return
    }

    setFinishingChallenge(challenge.id)
    try {
      await finishChallenge({
        userId,
        challengeId: challenge.id,
        isFinished: true,
        finishDate: new Date().toISOString()
      })

      onChallengeFinished?.(challenge)
    } catch (error) {
      console.error('Error finishing challenge:', error)
    } finally {
      setFinishingChallenge(null)
    }
  }
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
              <p>
                <button
                  className="backdrop-blur-lg"
                  onClick={() => handleFinishChallenge(challenge)}
                  disabled={finishingChallenge === challenge.id}
                >
                  {finishingChallenge === challenge.id ? 'Finishing...' : 'Finish challenge'}
                </button>
              </p>
            </div>
          ))}
        </div>

        {/* Add Challenge Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="font-semibold px-8 py-3 bg-border text-text border-none rounded-xl cursor-pointer transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1"
        >
          Add a challenge
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-accent rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:text-header text-2xl font-bold transition-colors"
            >
              ×
            </button>

            <h2 className="text-2xl font-heading font-bold text-black mb-6 text-center">
              Add New Challenge
            </h2>

            <form onSubmit={handleSave}>
              <div className="mb-6">
                <label className="block mb-2 font-medium text-black text-left">
                  Challenge
                </label>
                <select
                  value={selectedChallengeId}
                  onChange={(e) => setSelectedChallengeId(e.target.value)}
                  required
                  className="w-full p-4 rounded-xl bg-[#978A74] text-black border-none outline-none focus:ring-2 focus:ring-purple transition-all duration-300"
                >
                  <option value="">Select a challenge</option>
                  {possibleChallenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                      {challenge.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full font-semibold p-4 bg-border text-text border-none rounded-xl cursor-pointer transition-all duration-300 hover:bg-header hover:text-white hover:shadow-lg hover:-translate-y-1"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ActiveChallenges