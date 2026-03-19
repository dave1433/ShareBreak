# Profile Settings API Documentation

## Overview
This module handles user profile settings including privacy controls, notification preferences, and language selection for the ShareBreak app.

## Architecture

### Services
- **ProfileSettingsService** - CRUD operations for profile settings
- **PrivacyService** - Privacy logic and visibility checks

### Controllers
- **ProfileSettingsController** - REST API endpoints for profile settings

### Data Transfer Objects (DTOs)
- `ProfileSettingsResponse` - Complete settings response
- `PrivacySettingsResponse` - Privacy settings only
- `NotificationPreferencesResponse` - Notification preferences only
- `UpdatePrivacySettingsRequest` - Update privacy settings
- `UpdateNotificationPreferencesRequest` - Update notifications
- `UpdateLanguageRequest` - Update language
- `PublicProfileDto` - Public profile view with privacy filters applied

## API Endpoints

### Get My Settings
```
GET /api/profilesettings/my-settings
```
Returns all settings for the authenticated user (privacy, notifications, language).

### Privacy Settings

#### Get Privacy Settings
```
GET /api/profilesettings/privacy
```

#### Update Privacy Settings
```
PUT /api/profilesettings/privacy
Content-Type: application/json

{
  "bioVisibility": 0,
  "locationVisibility": 1,
  "interestsVisibility": 0,
  "friendListVisibility": 2,
  "profileImageVisibility": 0,
  "challengesCompletedVisibility": 0,
  "friendCountVisibility": 0,
  "badgesVisibility": 0,
  "pointsVisibility": 0
}
```

### Notification Preferences

#### Get Notification Preferences
```
GET /api/profilesettings/notifications
```

#### Update Notification Preferences
```
PUT /api/profilesettings/notifications
Content-Type: application/json

{
  "notifyFriendRequests": true,
  "notifyChallengeUpdates": true,
  "notifyFriendActivity": true,
  "notifyNewBadges": true
}
```

### Language

#### Get Language
```
GET /api/profilesettings/language
```

#### Update Language
```
PUT /api/profilesettings/language
Content-Type: application/json

{
  "language": "en"
}
```

Supported languages: `"en"` (English), `"da"` (Danish)

### Update All Settings
```
PUT /api/profilesettings/all
Content-Type: application/json

{
  "language": "en",
  "notificationPreferences": {
    "notifyFriendRequests": true,
    "notifyChallengeUpdates": true,
    "notifyFriendActivity": true,
    "notifyNewBadges": true
  },
  "privacySettings": {
    "bioVisibility": 0,
    "locationVisibility": 1,
    ...
  }
}
```

## Privacy Levels

Visibility levels are numeric values:

| Level | Value | Meaning |
|-------|-------|---------|
| Everyone | 0 | Visible to all users |
| Acquaintance | 1 | Visible to acquaintances and closer |
| Friend | 2 | Visible to friends and closer |
| Best Friend | 3 | Visible to best friends only |
| Private | 4 | Not visible to anyone |

## Friend Tiers

The system supports friend relationship tiers:
- **Stranger** - No relationship
- **Acquaintance** - Basic friend connection
- **Friend** - Regular friend
- **Best Friend** - Close friend (limited to ~5 people)

## Privacy Logic

The `PrivacyService` determines visibility based on:
1. **User Relationship**: Determines the relationship between viewer and profile owner
2. **Field Visibility Setting**: Each field has a privacy level (0-4)
3. **Access Decision**: Returns true if viewer can see the field

### Example
If a user sets `bioVisibility = 2` (Friend level):
- **Best Friends** can see it ✓
- **Friends** can see it ✓
- **Acquaintances** cannot see it ✗
- **Strangers** cannot see it ✗

## Stand-in Implementations

The following need to be connected to the actual database implementation:

### In `ProfileSettingsService`:
- `GetProfileSettingsAsync()` - Query user settings from database
- `UpdatePrivacySettingsAsync()` - Persist privacy changes
- `UpdateNotificationPreferencesAsync()` - Persist notification changes
- `UpdateLanguageAsync()` - Persist language preference

### In `PrivacyService`:
- `GetUserRelationshipAsync()` - Query friend relationship from database

### In `ProfileSettingsController`:
- `GetCurrentUserId()` - Extract user ID from authentication token

## Future Enhancements

- [ ] Implement `GET /api/profiles/{userId}` - View public profile with privacy filters
- [ ] Add audit logging for privacy setting changes
- [ ] Implement profile visibility history
- [ ] Add privacy presets (e.g., "Completely Private", "Friends Only", "Public")
- [ ] Real-time privacy filter evaluation for other API endpoints
- [ ] Batch visibility level updates for specific friend tiers
