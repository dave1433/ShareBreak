namespace server.Dtos;

/// <summary>
/// Friend list item DTO
/// </summary>
public class FriendDto
{
    public Guid UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsBestFriend { get; set; }
    public bool? IsOnline { get; set; }
    public string? ProfileImageUrl { get; set; }
}

/// <summary>
/// Pending friend request DTO
/// </summary>
public class FriendRequestDto
{
    public Guid RequestId { get; set; }
    public Guid SenderId { get; set; }
    public string SenderName { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
}

/// <summary>
/// User search result DTO
/// RelationshipStatus: "none" | "pending_sent" | "pending_received" | "friends"
/// </summary>
public class SearchResultDto
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string RelationshipStatus { get; set; } = "none";
}
