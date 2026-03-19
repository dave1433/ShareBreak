namespace ShareBreak.Dtos;

/// <summary>
/// Request DTO for updating notification preferences
/// </summary>
public class UpdateNotificationPreferencesRequest
{
    public bool NotifyFriendRequests { get; set; } = true;
    public bool NotifyChallengeUpdates { get; set; } = true;
    public bool NotifyFriendActivity { get; set; } = true;
    public bool NotifyNewBadges { get; set; } = true;
}

/// <summary>
/// Response DTO for getting notification preferences
/// </summary>
public class NotificationPreferencesResponse
{
    public int UserId { get; set; }
    public bool NotifyFriendRequests { get; set; }
    public bool NotifyChallengeUpdates { get; set; }
    public bool NotifyFriendActivity { get; set; }
    public bool NotifyNewBadges { get; set; }
}
