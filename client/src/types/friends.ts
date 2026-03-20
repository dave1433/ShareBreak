export interface SearchResultDto {
  userId: string
  name: string
  email: string
  relationshipStatus: string
}

export interface FriendRequestDto {
  requestId: string
  senderId: string
  senderName: string
  senderEmail: string
  requestedAt: string
}

export interface FriendDto {
  userId: string
  firstName: string
  email: string
  isBestFriend: boolean
  isOnline?: boolean
  profileImageUrl?: string
}
