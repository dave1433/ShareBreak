namespace ShareBreak.Dtos;

/// <summary>
/// DTO for viewing another user's public profile.
/// Only includes fields that are visible based on privacy settings and relationship.
/// </summary>
public class PublicProfileDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = string.Empty; // Always visible

    // These are conditionally included based on privacy settings
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public List<string>? Interests { get; set; }
    public string? ProfileImageUrl { get; set; }
    public int? FriendCount { get; set; }
    public int? ChallengesCompleted { get; set; }
    public int? TotalPoints { get; set; }
    public List<string>? Badges { get; set; }
    public List<PublicFriendDto>? Friends { get; set; }
}

/// <summary>
/// Simplified friend info for friend list (respects friend list privacy)
/// </summary>
public class PublicFriendDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
}
