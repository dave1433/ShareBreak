namespace server.Entities;

/// <summary>
/// Category-specific badge earned by user (5 categories, 5 tiers each)
/// </summary>
public class CategoryBadge
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Category { get; set; } = null!; // "Photography", "Health", "Fitness", "Reading", "Socializing"
    public int Tier { get; set; } // 0=tutorial, 1-4=bronze/silver/gold/platinum tiers (names vary by category)
    public DateTime EarnedAt { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}