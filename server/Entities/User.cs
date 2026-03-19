namespace server.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Birthday { get; set; }
    public bool IsDeleted { get; set; }
    public int TotalPoints { get; set; } = 0;

    // Navigation properties
    public List<Friend> Friends { get; set; } = new();
    public ProfileBadge? ProfileBadge { get; set; }
    public List<CategoryBadge> CategoryBadges { get; set; } = new();
}