namespace server.Services;

using server.Dtos;

/// <summary>
/// Service for handling privacy and visibility logic
/// Determines what data can be shown to a requesting user based on their relationship
/// Simplified model: Everyone, Friend, BestFriend, Private
/// </summary>
public class PrivacyService
{
    /// <summary>
    /// Represents the relationship between a requesting user and a profile owner
    /// </summary>
    public enum UserRelationship
    {
        Self = 0,           // Viewing own profile
        BestFriend = 1,     // Best friend relationship (isBestFriend = true)
        Friend = 2,         // Friend relationship (isBestFriend = false)
        Everyone = 3        // No relationship (public visibility)
    }

    /// <summary>
    /// Checks if a field should be visible based on privacy level and relationship
    /// Privacy levels: 0=Everyone, 1=Friend, 2=BestFriend, 3=Private
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
                VisibilityLevel.Friend => true,
                VisibilityLevel.BestFriend => true,
                VisibilityLevel.Private => false,
                _ => false
            },

            UserRelationship.Friend => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Friend => true,
                VisibilityLevel.BestFriend => false,
                VisibilityLevel.Private => false,
                _ => false
            },

            UserRelationship.Everyone => requiredVisibility switch
            {
                VisibilityLevel.Everyone => true,
                VisibilityLevel.Friend => false,
                VisibilityLevel.BestFriend => false,
                VisibilityLevel.Private => false,
                _ => false
            },

            _ => false
        };
    }

    /// <summary>
    /// Determines the relationship between two users based on Friend entity
    /// TODO: Inject IFriendRepository or DbContext to query Friend table
    /// </summary>
    public async Task<UserRelationship> GetUserRelationshipAsync(int viewingUserId, int profileOwnerId)
    {
        // If viewing own profile
        if (viewingUserId == profileOwnerId)
            return UserRelationship.Self;

        // TODO: Query Friend table:
        // - Look for Friend record with UserId=viewingUserId, FriendId=profileOwnerId
        // - If found and isBestFriend=true, return BestFriend
        // - If found and isBestFriend=false, return Friend
        // - If not found, return Everyone (no relationship)

        // Stand-in for now
        return UserRelationship.Everyone;
    }
}
