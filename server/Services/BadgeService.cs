using server.Dtos;
using server.Entities;

namespace server.Services;

public class BadgeService
{
    private static readonly Dictionary<string, string[]> CategoryTierNames = new()
    {
        { "Photography", new[] { "Tutorial", "Novice", "Amateur", "Enthusiast", "Professional", "Master" } },
        { "Health", new[] { "Tutorial", "Beginner", "Active", "Fit", "Athletic", "Elite" } },
        { "Fitness", new[] { "Tutorial", "Starter", "Consistent", "Strong", "Powerful", "Champion" } },
        { "Reading", new[] { "Tutorial", "Bookworm", "Reader", "Avid Reader", "Scholar", "Intellectual" } },
        { "Socializing", new[] { "Tutorial", "Social", "Connector", "Networker", "Community Leader", "Social Butterfly" } }
    };

    private static readonly string[] ProfileTierNames = new[] { "Bronze", "Silver", "Gold", "Platinum", "Diamond" };

    /// <summary>
    /// Get the profile badge tier based on total points
    /// Tiers: Bronze (0), Silver (1000), Gold (2500), Platinum (5000), Diamond (10000)
    /// </summary>
    public static int GetProfileBadgeTier(int totalPoints)
    {
        if (totalPoints >= 10000) return 4; // Diamond
        if (totalPoints >= 5000) return 3;  // Platinum
        if (totalPoints >= 2500) return 2;  // Gold
        if (totalPoints >= 1000) return 1;  // Silver
        return 0; // Bronze (anyone with points)
    }

    /// <summary>
    /// Get the category badge tier based on category points
    /// Tiers: Tutorial (0), 250 (1), 500 (2), 1000 (3), 2500 (4)
    /// </summary>
    public static int GetCategoryBadgeTier(int categoryPoints)
    {
        if (categoryPoints >= 2500) return 4;
        if (categoryPoints >= 1000) return 3;
        if (categoryPoints >= 500) return 2;
        if (categoryPoints >= 250) return 1;
        return 0; // Tutorial completion
    }

    /// <summary>
    /// Get tier name for profile badge
    /// </summary>
    public static string GetProfileBadgeTierName(int tier)
    {
        return tier >= 0 && tier < ProfileTierNames.Length ? ProfileTierNames[tier] : "Unknown";
    }

    /// <summary>
    /// Get tier name for category badge
    /// </summary>
    public static string GetCategoryBadgeTierName(string category, int tier)
    {
        if (!CategoryTierNames.TryGetValue(category, out var tiers))
            return "Unknown";

        return tier >= 0 && tier < tiers.Length ? tiers[tier] : "Unknown";
    }

    /// <summary>
    /// Check if a category badge has been earned (completed at least one tutorial)
    /// </summary>
    public static bool HasCategoryBadge(List<CategoryBadge> categoryBadges, string category)
    {
        return categoryBadges.Any(cb => cb.Category == category);
    }

    /// <summary>
    /// Get highest tier for a specific category
    /// </summary>
    public static int GetHighestCategoryTier(List<CategoryBadge> categoryBadges, string category)
    {
        var badge = categoryBadges.FirstOrDefault(cb => cb.Category == category);
        return badge?.Tier ?? -1; // -1 means not earned
    }

    /// <summary>
    /// Check if a new profile badge tier has been unlocked
    /// </summary>
    public static bool HasNewProfileBadgeTier(int oldTotalPoints, int newTotalPoints)
    {
        return GetProfileBadgeTier(oldTotalPoints) < GetProfileBadgeTier(newTotalPoints);
    }

    /// <summary>
    /// Check if a new category badge tier has been unlocked
    /// </summary>
    public static bool HasNewCategoryBadgeTier(int oldCategoryPoints, int newCategoryPoints)
    {
        return GetCategoryBadgeTier(oldCategoryPoints) < GetCategoryBadgeTier(newCategoryPoints);
    }

    /// <summary>
    /// Convert ProfileBadge entity to DTO
    /// </summary>
    public static ProfileBadgeDto MapToDto(ProfileBadge badge)
    {
        return new ProfileBadgeDto
        {
            Id = badge.Id,
            Tier = badge.Tier,
            TierName = GetProfileBadgeTierName(badge.Tier),
            EarnedAt = badge.EarnedAt
        };
    }

    /// <summary>
    /// Convert CategoryBadge entity to DTO
    /// </summary>
    public static CategoryBadgeDto MapToDto(CategoryBadge badge)
    {
        return new CategoryBadgeDto
        {
            Id = badge.Id,
            Category = badge.Category,
            Tier = badge.Tier,
            TierName = GetCategoryBadgeTierName(badge.Category, badge.Tier),
            EarnedAt = badge.EarnedAt
        };
    }
}
