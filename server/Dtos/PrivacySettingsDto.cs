namespace server.Dtos;

/// <summary>
/// Privacy levels: 0=Everyone, 1=Friend, 2=BestFriend, 3=Private
/// Simplified model: Everyone (all users), Friend, BestFriend, Private (nobody)
/// </summary>
public enum VisibilityLevel
{
    Everyone = 0,
    Friend = 1,
    BestFriend = 2,
    Private = 3
}

/// <summary>
/// Request DTO for updating privacy settings for all profile fields
/// </summary>
public class UpdatePrivacySettingsRequest
{
    public int BioVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int LocationVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int InterestsVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int FriendListVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int ProfileImageVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int ChallengesCompletedVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int FriendCountVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int BadgesVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int PointsVisibility { get; set; } = (int)VisibilityLevel.Everyone;
    public int OnlineStatusVisibility { get; set; } = (int)VisibilityLevel.Everyone;
}

/// <summary>
/// Response DTO for getting privacy settings
/// </summary>
public class PrivacySettingsResponse
{
    public int UserId { get; set; }
    public int BioVisibility { get; set; }
    public int LocationVisibility { get; set; }
    public int InterestsVisibility { get; set; }
    public int FriendListVisibility { get; set; }
    public int ProfileImageVisibility { get; set; }
    public int ChallengesCompletedVisibility { get; set; }
    public int FriendCountVisibility { get; set; }
    public int BadgesVisibility { get; set; }
    public int PointsVisibility { get; set; }
    public int OnlineStatusVisibility { get; set; }
}
