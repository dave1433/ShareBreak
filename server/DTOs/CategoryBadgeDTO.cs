namespace server.Dtos;

public class CategoryBadgeDto
{
    public int Id { get; set; }
    public string Category { get; set; } = null!; // "Photography", "Health", "Fitness", "Reading", "Socializing"
    public int Tier { get; set; } // 0-4 mapping to tier names per category
    public string TierName { get; set; } = null!;
    public DateTime EarnedAt { get; set; }
}