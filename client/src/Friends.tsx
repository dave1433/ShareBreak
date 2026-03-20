import { useState, useEffect } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from './utils/api'
import type { SearchResultDto, FriendRequestDto, FriendDto } from './types/friends'

function Friends() {
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResultDto | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const [pendingRequests, setPendingRequests] = useState<FriendRequestDto[]>([])
  const [friends, setFriends] = useState<FriendDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const reqs = await apiGet<FriendRequestDto[]>('friends/requests')
      const frds = await apiGet<FriendDto[]>('friends')
      setPendingRequests(reqs)
      setFriends(frds)
      setError('')
    } catch (err) {
      setError('Failed to load friends data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setSearchError('Please enter an email')
      return
    }
    try {
      setSearchLoading(true)
      setSearchError('')
      const result = await apiGet<SearchResultDto>(
        `friends/search?email=${encodeURIComponent(searchEmail)}`
      )
      console.log('Search result:', result)
      setSearchResult(result)
    } catch (err) {
      setSearchError('User not found')
      setSearchResult(null)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleAddFriend = async (userId: string) => {
    try {
      await apiPost(`friends/request/${userId}`, {})
      if (searchResult) {
        setSearchResult({ ...searchResult, RelationshipStatus: 'pending_sent' })
      }
    } catch (err) {
      setSearchError('Failed to send request')
    }
  }

  const handleAccept = async (requestId: string) => {
    try {
      await apiPut(`friends/accept/${requestId}`, {})
      setPendingRequests(pendingRequests.filter((r) => r.RequestId !== requestId))
      await loadData()
    } catch (err) {
      setError('Failed to accept')
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      await apiPut(`friends/reject/${requestId}`, {})
      setPendingRequests(pendingRequests.filter((r) => r.RequestId !== requestId))
    } catch (err) {
      setError('Failed to reject')
    }
  }

  const handleRemove = async (friendId: string) => {
    try {
      await apiDelete(`friends/${friendId}`)
      setFriends(friends.filter((f) => f.UserId !== friendId))
    } catch (err) {
      setError('Failed to remove')
    }
  }

  if (loading && friends.length === 0 && pendingRequests.length === 0) {
    return <div className="min-h-screen bg-bg p-4 text-text text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-bg p-4">
      <div className="max-w-2xl mx-auto">
        {/* Search */}
        <div className="bg-bg rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6">Search Friends</h2>
          <div className="flex gap-2">
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 p-4 rounded-xl bg-[#978A74] text-black placeholder-bg border-none outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={searchLoading}
              className="bg-purple text-white px-8 py-4 rounded-xl font-semibold"
            >
              Search
            </button>
          </div>
          {searchError && <p className="text-red-500 mt-4">{searchError}</p>}
          {searchResult && (
            <div className="mt-6 p-4 bg-border rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-text">{searchResult.Name}</p>
                <p className="text-sm text-text opacity-70">{searchResult.Email}</p>
              </div>
              <button
                onClick={() => handleAddFriend(searchResult.UserId)}
                disabled={searchResult.RelationshipStatus !== 'none'}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  searchResult.RelationshipStatus === 'none'
                    ? 'bg-purple text-white'
                    : 'bg-border text-text opacity-50'
                }`}
              >
                {searchResult.RelationshipStatus === 'none'
                  ? 'Add Friend'
                  : searchResult.RelationshipStatus === 'pending_sent'
                    ? 'Request Sent'
                    : 'Already Friends'}
              </button>
            </div>
          )}
        </div>

        {/* Requests */}
        {pendingRequests.length > 0 && (
          <div className="bg-bg rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6">
              Requests ({pendingRequests.length})
            </h2>
            {pendingRequests.map((req) => (
              <div key={req.RequestId} className="p-4 bg-border rounded-2xl mb-2 flex justify-between">
                <div>
                  <p className="font-semibold text-text">{req.SenderName}</p>
                  <p className="text-sm text-text opacity-70">{req.SenderEmail}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(req.RequestId)}
                    className="bg-purple text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req.RequestId)}
                    className="bg-border text-text px-3 py-1 rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Friends */}
        <div className="bg-bg rounded-3xl p-8 shadow-lg">
          <h2 className="text-clamp-h2 font-heading font-bold text-text mb-6">Friends</h2>
          {friends.length === 0 ? (
            <p className="text-text opacity-70">No friends yet</p>
          ) : (
            <div className="space-y-2">
              {friends.map((f) => (
                <div key={f.UserId} className="p-3 bg-border rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-text">
                      {f.FirstName} {f.IsBestFriend && '⭐'}
                    </p>
                    <p className="text-sm text-text opacity-70">{f.Email}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(f.UserId)}
                    className="text-text opacity-70 text-sm hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    </div>
  )
}

export default Friends
