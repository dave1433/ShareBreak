namespace server.Entities;

public enum FriendStatus
{
    Pending = 0,
    Accepted = 1
}

public class Friend
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid FriendId { get; set; }
    public bool IsBestFriend { get; set; }
    public FriendStatus Status { get; set; } = FriendStatus.Pending;
    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
    public Guid RequesterId { get; set; }
    public int InteractionScore { get; set; } = 0;

    // Navigation
    public User User { get; set; } = null!;
}