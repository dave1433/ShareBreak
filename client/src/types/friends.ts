export interface SearchResultDto {
  UserId: string
  Name: string
  Email: string
  RelationshipStatus: string
}

export interface FriendRequestDto {
  RequestId: string
  SenderId: string
  SenderName: string
  SenderEmail: string
  RequestedAt: string
}

export interface FriendDto {
  UserId: string
  FirstName: string
  IsBestFriend: boolean
  IsOnline?: boolean
  ProfileImageUrl?: string
}
