namespace server.Entities;

public class Friend
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid FriendId { get; set; }
    public bool IsBestFriend { get; set; }

    // Navigation
    public User User { get; set; } = null!;
    public User FriendUser { get; set; } = null!;
}