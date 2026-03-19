using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Entities;

namespace server.Services;

public class FriendService
{
    private readonly MyDbContext _ctx;

    public FriendService(MyDbContext ctx)
    {
        _ctx = ctx;
    }

    /// <summary>
    /// Search for a user by email
    /// </summary>
    public async Task<SearchResultDto?> SearchByEmailAsync(string email, Guid requesterId)
    {
        var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);
        if (user == null)
            return null;

        if (user.Id == requesterId)
            return null; // Can't search for yourself

        // Determine relationship status
        var friendship = await _ctx.Friends
            .FirstOrDefaultAsync(f => f.UserId == requesterId && f.FriendId == user.Id);

        string relationshipStatus = "none";
        if (friendship != null)
        {
            if (friendship.Status == FriendStatus.Accepted)
                relationshipStatus = "friends";
            else if (friendship.RequesterId == requesterId)
                relationshipStatus = "pending_sent";
            else
                relationshipStatus = "pending_received";
        }

        return new SearchResultDto
        {
            UserId = user.Id,
            Name = user.Name,
            Email = user.Email,
            RelationshipStatus = relationshipStatus
        };
    }

    /// <summary>
    /// Send a friend request
    /// </summary>
    public async Task SendRequestAsync(Guid senderId, Guid receiverId)
    {
        var existingRequest = await _ctx.Friends
            .FirstOrDefaultAsync(f => f.UserId == senderId && f.FriendId == receiverId);

        if (existingRequest != null)
            throw new InvalidOperationException("Request already exists");

        var friendRequest = new Friend
        {
            UserId = senderId,
            FriendId = receiverId,
            Status = FriendStatus.Pending,
            RequesterId = senderId,
            RequestedAt = DateTime.UtcNow,
            InteractionScore = 0,
            IsBestFriend = false
        };

        _ctx.Friends.Add(friendRequest);
        await _ctx.SaveChangesAsync();
    }

    /// <summary>
    /// Get pending friend requests for a user
    /// </summary>
    public async Task<List<FriendRequestDto>> GetPendingRequestsAsync(Guid userId)
    {
        var requests = await _ctx.Friends
            .Where(f => f.FriendId == userId && f.Status == FriendStatus.Pending)
            .Include(f => f.User)
            .ToListAsync();

        return requests.Select(f => new FriendRequestDto
        {
            RequestId = f.Id,
            SenderId = f.RequesterId,
            SenderName = f.User.Name,
            SenderEmail = f.User.Email,
            RequestedAt = f.RequestedAt
        }).ToList();
    }

    /// <summary>
    /// Accept a friend request
    /// </summary>
    public async Task AcceptRequestAsync(Guid requestId, Guid acceptingUserId)
    {
        var request = await _ctx.Friends.FirstOrDefaultAsync(f => f.Id == requestId);
        if (request == null || request.FriendId != acceptingUserId)
            throw new InvalidOperationException("Request not found");

        request.Status = FriendStatus.Accepted;

        // Create reciprocal friendship
        var reciprocal = new Friend
        {
            UserId = acceptingUserId,
            FriendId = request.UserId,
            Status = FriendStatus.Accepted,
            RequesterId = request.RequesterId,
            RequestedAt = request.RequestedAt,
            InteractionScore = 0,
            IsBestFriend = false
        };

        _ctx.Friends.Add(reciprocal);
        await _ctx.SaveChangesAsync();
    }

    /// <summary>
    /// Reject a friend request
    /// </summary>
    public async Task RejectRequestAsync(Guid requestId, Guid rejectingUserId)
    {
        var request = await _ctx.Friends.FirstOrDefaultAsync(f => f.Id == requestId);
        if (request == null || request.FriendId != rejectingUserId)
            throw new InvalidOperationException("Request not found");

        _ctx.Friends.Remove(request);
        await _ctx.SaveChangesAsync();
    }

    /// <summary>
    /// Get friends list with privacy filtering
    /// </summary>
    public async Task<List<FriendDto>> GetFriendsAsync(Guid userId, PrivacyService privacy)
    {
        var friends = await _ctx.Friends
            .Where(f => f.UserId == userId && f.Status == FriendStatus.Accepted)
            .Include(f => f.User)
            .ToListAsync();

        var result = new List<FriendDto>();
        foreach (var friendship in friends)
        {
            var friend = friendship.User;
            var onlineStatus = friend.LastSeen != null 
                ? (DateTime.UtcNow - friend.LastSeen.Value).TotalMinutes < 5 
                : (bool?)null;

            result.Add(new FriendDto
            {
                UserId = friend.Id,
                FirstName = friend.Name.Split(' ').First(),
                IsBestFriend = friendship.IsBestFriend,
                IsOnline = onlineStatus,
                ProfileImageUrl = null // TODO: Add when profile images are implemented
            });
        }

        return result;
    }

    /// <summary>
    /// Remove a friend (both directions)
    /// </summary>
    public async Task RemoveFriendAsync(Guid userId, Guid friendId)
    {
        var friendships = await _ctx.Friends
            .Where(f => (f.UserId == userId && f.FriendId == friendId) ||
                        (f.UserId == friendId && f.FriendId == userId))
            .ToListAsync();

        _ctx.Friends.RemoveRange(friendships);
        await _ctx.SaveChangesAsync();
    }

    /// <summary>
    /// Increment interaction score (both directions)
    /// </summary>
    public async Task IncrementInteractionAsync(Guid userId, Guid friendId)
    {
        var friendships = await _ctx.Friends
            .Where(f => (f.UserId == userId && f.FriendId == friendId) ||
                        (f.UserId == friendId && f.FriendId == userId))
            .ToListAsync();

        foreach (var friendship in friendships)
        {
            friendship.InteractionScore++;
        }

        await _ctx.SaveChangesAsync();
    }

    /// <summary>
    /// Recalculate best friend for a user (highest interaction score)
    /// </summary>
    public async Task RecalculateBestFriendAsync(Guid userId)
    {
        var friendships = await _ctx.Friends
            .Where(f => f.UserId == userId && f.Status == FriendStatus.Accepted)
            .ToListAsync();

        // Reset all best friend flags
        foreach (var f in friendships)
            f.IsBestFriend = false;

        // Find the friend with highest interaction score
        var bestFriend = friendships.OrderByDescending(f => f.InteractionScore).FirstOrDefault();
        if (bestFriend != null)
            bestFriend.IsBestFriend = true;

        await _ctx.SaveChangesAsync();
    }
}
