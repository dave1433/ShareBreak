namespace server.Entities;

/// <summary>
/// Global profile badge tier earned by user based on total points
/// </summary>
public class ProfileBadge
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public int Tier { get; set; } // 0=Bronze, 1=Silver, 2=Gold, 3=Platinum, 4=Diamond
    public DateTime EarnedAt { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}