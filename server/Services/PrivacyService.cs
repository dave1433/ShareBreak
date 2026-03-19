namespace ShareBreak.Services;

using ShareBreak.Dtos;

/// <summary>
/// Service for handling privacy and visibility logic
/// Determines what data can be shown to a requesting user based on their relationship
/// </summary>
public class PrivacyService
{
    /// <summary>
    /// Represents the relationship between a requesting user and a profile owner
    /// </summary>
    public enum UserRelationship
    {
        Self = 0,           // Viewing own profile
        BestFriend = 1,     // Best friend relationship
        Friend = 2,         // Friend relationship
        Acquaintance = 3,   // Acquaintance relationship
        Stranger = 4        // No relationship
    }

    /// <summary>
    /// Checks if a field should be visible based on privacy level and relationship
    /// </summary>
    public static bool CanViewField(int fieldVisibility, UserRelationship relationship)
    {
        var requiredVisibility = (VisibilityLevel)fieldVisibility;

        return relationship switch
        {
            UserRelationship.Self => true, // Always see own data

            UserRelationship.BestFriend => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Acquaintance => true,
                VisibilityLevel.Friend => true,
                VisibilityLevel.BestFriend => true,
                VisibilityLevel.Private => false,
                _ => false
            },

            UserRelationship.Friend => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Acquaintance => true,
                VisibilityLevel.Friend => true,
                VisibilityLevel.BestFriend => false,
                VisibilityLevel.Private => false,
                _ => false
            },

            UserRelationship.Acquaintance => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Acquaintance => true,
                VisibilityLevel.Friend => false,
                VisibilityLevel.BestFriend => false,
                VisibilityLevel.Private => false,
                _ => false
            },

            UserRelationship.Stranger => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Acquaintance => false,
                VisibilityLevel.Friend => false,
                VisibilityLevel.BestFriend => false,
                VisibilityLevel.Private => false,
                _ => false
            },

            _ => false
        };
    }

    /// <summary>
    /// Determines the relationship between two users.
    /// TODO: Implement with actual friend relationship check from database
    /// </summary>
    public async Task<UserRelationship> GetUserRelationshipAsync(int viewingUserId, int profileOwnerId)
    {
        // If viewing own profile
        if (viewingUserId == profileOwnerId)
            return UserRelationship.Self;

        // TODO: Query database for friend relationship
        // For now, return Stranger as stand-in
        return UserRelationship.Stranger;
    }
}
