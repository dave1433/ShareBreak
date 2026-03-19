namespace server.Dtos;

public class ProfileBadgeDto
{
    public int Id { get; set; }
    public int Tier { get; set; } // 0=Bronze, 1=Silver, 2=Gold, 3=Platinum, 4=Diamond
    public string TierName { get; set; } = null!;
    public DateTime EarnedAt { get; set; }
}