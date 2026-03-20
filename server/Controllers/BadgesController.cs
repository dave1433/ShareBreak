using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BadgesController : ControllerBase
{
    private readonly BadgeService _badgeService;

    public BadgesController()
    {
        _badgeService = new BadgeService();
    }

    /// <summary>
    /// Get profile badge tier name for given points
    /// </summary>
    [HttpGet("profile-tier/{points}")]
    public ActionResult<object> GetProfileBadgeTier(int points)
    {
        var tier = BadgeService.GetProfileBadgeTier(points);
        var tierName = BadgeService.GetProfileBadgeTierName(tier);

        return Ok(new { tier, tierName, requiredPoints = GetProfileBadgeThreshold(tier) });
    }

    /// <summary>
    /// Get category badge tier name for given category points
    /// </summary>
    [HttpGet("category-tier/{category}/{points}")]
    public ActionResult<object> GetCategoryBadgeTier(string category, int points)
    {
        var tier = BadgeService.GetCategoryBadgeTier(points);
        var tierName = BadgeService.GetCategoryBadgeTierName(category, tier);

        return Ok(new { tier, tierName, requiredPoints = GetCategoryBadgeThreshold(tier) });
    }

    /// <summary>
    /// Get all profile badge tier thresholds
    /// </summary>
    [HttpGet("profile-thresholds")]
    public ActionResult<object> GetProfileBadgeThresholds()
    {
        return Ok(new
        {
            tiers = new[]
            {
                new { tier = 0, name = "Bronze", requiredPoints = 0 },
                new { tier = 1, name = "Silver", requiredPoints = 1000 },
                new { tier = 2, name = "Gold", requiredPoints = 2500 },
                new { tier = 3, name = "Platinum", requiredPoints = 5000 },
                new { tier = 4, name = "Diamond", requiredPoints = 10000 }
            }
        });
    }

    /// <summary>
    /// Get all category badge tier thresholds
    /// </summary>
    [HttpGet("category-thresholds")]
    public ActionResult<object> GetCategoryBadgeThresholds()
    {
        var categories = new[] { "Photography", "Health", "Fitness", "Reading", "Socializing" };
        var tiers = new object[categories.Length];

        for (int i = 0; i < categories.Length; i++)
        {
            tiers[i] = new
            {
                category = categories[i],
                tierThresholds = new[]
                {
                    new { tier = 0, name = BadgeService.GetCategoryBadgeTierName(categories[i], 0), requiredPoints = 0 },
                    new { tier = 1, name = BadgeService.GetCategoryBadgeTierName(categories[i], 1), requiredPoints = 250 },
                    new { tier = 2, name = BadgeService.GetCategoryBadgeTierName(categories[i], 2), requiredPoints = 500 },
                    new { tier = 3, name = BadgeService.GetCategoryBadgeTierName(categories[i], 3), requiredPoints = 1000 },
                    new { tier = 4, name = BadgeService.GetCategoryBadgeTierName(categories[i], 4), requiredPoints = 2500 }
                }
            };
        }

        return Ok(new { categories = tiers });
    }

    /// <summary>
    /// Helper method to get points required for profile badge tier
    /// </summary>
    private int GetProfileBadgeThreshold(int tier)
    {
        return tier switch
        {
            0 => 0,
            1 => 1000,
            2 => 2500,
            3 => 5000,
            4 => 10000,
            _ => 0
        };
    }

    /// <summary>
    /// Helper method to get points required for category badge tier
    /// </summary>
    private int GetCategoryBadgeThreshold(int tier)
    {
        return tier switch
        {
            0 => 0,
            1 => 250,
            2 => 500,
            3 => 1000,
            4 => 2500,
            _ => 0
        };
    }
}
