# Badge System Documentation

## Overview

The ShareBreak badge system consists of two types of badges:

1. **Profile Badges** - Global achievement badges based on total accumulated points
2. **Category Badges** - Category-specific badges earned within different challenge categories

## Profile Badges

Profile badges are earned based on a user's total points across all categories. There are 5 tiers:

| Tier | Name | Required Points |
|------|------|-----------------|
| 0 | Bronze | 0+ |
| 1 | Silver | 1000+ |
| 2 | Gold | 2500+ |
| 3 | Platinum | 5000+ |
| 4 | Diamond | 10000+ |

Users automatically progress through these tiers as they accumulate points. A user earns a "Bronze" badge just by starting challenges.

## Category Badges

Category badges are earned within specific challenge categories. There are 5 categories with 5 tiers each (including tutorial tier).

### Categories and Tier Names

#### 1. Photography
| Tier | Name | Required Category Points |
|------|------|--------------------------|
| 0 | Tutorial | 0+ (after first tutorial) |
| 1 | Novice | 250+ |
| 2 | Amateur | 500+ |
| 3 | Enthusiast | 1000+ |
| 4 | Professional | 2500+ |
| 5 | Master | 5000+ |

#### 2. Health
| Tier | Name | Required Category Points |
|------|------|--------------------------|
| 0 | Tutorial | 0+ (after first tutorial) |
| 1 | Beginner | 250+ |
| 2 | Active | 500+ |
| 3 | Fit | 1000+ |
| 4 | Athletic | 2500+ |
| 5 | Elite | 5000+ |

#### 3. Fitness
| Tier | Name | Required Category Points |
|------|------|--------------------------|
| 0 | Tutorial | 0+ (after first tutorial) |
| 1 | Starter | 250+ |
| 2 | Consistent | 500+ |
| 3 | Strong | 1000+ |
| 4 | Powerful | 2500+ |
| 5 | Champion | 5000+ |

#### 4. Reading
| Tier | Name | Required Category Points |
|------|------|--------------------------|
| 0 | Tutorial | 0+ (after first tutorial) |
| 1 | Bookworm | 250+ |
| 2 | Reader | 500+ |
| 3 | Avid Reader | 1000+ |
| 4 | Scholar | 2500+ |
| 5 | Intellectual | 5000+ |

#### 5. Socializing
| Tier | Name | Required Category Points |
|------|------|--------------------------|
| 0 | Tutorial | 0+ (after first tutorial) |
| 1 | Social | 250+ |
| 2 | Connector | 500+ |
| 3 | Networker | 1000+ |
| 4 | Community Leader | 2500+ |
| 5 | Social Butterfly | 5000+ |

## API Endpoints

### Get Profile Badge Tier
**GET** `/api/badges/profile-tier/{points}`

Returns the badge tier and name for the given total points.

**Response:**
```json
{
  "tier": 1,
  "tierName": "Silver",
  "requiredPoints": 1000
}
```

### Get Category Badge Tier
**GET** `/api/badges/category-tier/{category}/{points}`

Returns the badge tier and name for the given category and category points.

**Response:**
```json
{
  "tier": 2,
  "tierName": "Amateur",
  "requiredPoints": 500
}
```

### Get Profile Badge Thresholds
**GET** `/api/badges/profile-thresholds`

Returns all profile badge tier thresholds.

**Response:**
```json
{
  "tiers": [
    { "tier": 0, "name": "Bronze", "requiredPoints": 0 },
    { "tier": 1, "name": "Silver", "requiredPoints": 1000 },
    { "tier": 2, "name": "Gold", "requiredPoints": 2500 },
    { "tier": 3, "name": "Platinum", "requiredPoints": 5000 },
    { "tier": 4, "name": "Diamond", "requiredPoints": 10000 }
  ]
}
```

### Get Category Badge Thresholds
**GET** `/api/badges/category-thresholds`

Returns all category badge tier thresholds for all 5 categories.

**Response:**
```json
{
  "categories": [
    {
      "category": "Photography",
      "tierThresholds": [
        { "tier": 0, "name": "Tutorial", "requiredPoints": 0 },
        { "tier": 1, "name": "Novice", "requiredPoints": 250 },
        { "tier": 2, "name": "Amateur", "requiredPoints": 500 },
        { "tier": 3, "name": "Enthusiast", "requiredPoints": 1000 },
        { "tier": 4, "name": "Professional", "requiredPoints": 2500 }
      ]
    },
    ...
  ]
}
```

## Database Schema

### ProfileBadge Table
```
- Id (int, PK)
- UserId (int, FK to Users.Id)
- Tier (int) - 0-4 representing badge tier
- EarnedAt (DateTime)
```

### CategoryBadge Table
```
- Id (int, PK)
- UserId (int, FK to Users.Id)
- Category (string) - One of: Photography, Health, Fitness, Reading, Socializing
- Tier (int) - 0-4 representing badge tier
- EarnedAt (DateTime)
```

### User Table
```
- ... existing fields ...
- TotalPoints (int) - Cached total points across all challenges
- ProfileBadge (ProfileBadge) - Navigation property (one-to-one)
- CategoryBadges (List<CategoryBadge>) - Navigation property (one-to-many)
```

## Badge Service

The `BadgeService` class provides utility methods for badge calculations:

### Methods

- `GetProfileBadgeTier(int totalPoints)` - Returns tier (0-4) based on points
- `GetCategoryBadgeTier(int categoryPoints)` - Returns tier (0-4) based on category points
- `GetProfileBadgeTierName(int tier)` - Returns the display name for a profile badge tier
- `GetCategoryBadgeTierName(string category, int tier)` - Returns the display name for a category badge tier
- `HasCategoryBadge(List<CategoryBadge> badges, string category)` - Checks if user has any badge in a category
- `GetHighestCategoryTier(List<CategoryBadge> badges, string category)` - Gets the highest tier in a category
- `HasNewProfileBadgeTier(int oldPoints, int newPoints)` - Checks if points crossed a tier boundary
- `HasNewCategoryBadgeTier(int oldPoints, int newPoints)` - Checks if category points crossed a tier boundary
- `MapToDto(ProfileBadge)` - Converts entity to DTO with tier name
- `MapToDto(CategoryBadge)` - Converts entity to DTO with tier name

## Privacy Integration

Badges are included in the `PublicProfileDto` and are subject to privacy settings. The badge visibility can be configured as part of the user's privacy settings (e.g., `BadgesVisibility`).

When returning a public profile, include:
- `ProfileBadge` (if `BadgesVisibility` allows)
- `CategoryBadges` list (if `BadgesVisibility` allows)

## Future Implementation

- **Badge Images/Icons**: Currently placeholder. Each badge tier can have associated images/icons
- **Challenge Integration**: Points are earned from challenges (to be implemented)
- **Notifications**: Users should receive notifications when earning a new badge tier
- **Leaderboards**: Users should be ranked by total points and category points
- **Tutorial Challenges**: 5 tutorial challenges (one per category) to help users get started
