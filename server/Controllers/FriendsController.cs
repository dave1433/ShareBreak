using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FriendsController(FriendService service, PrivacyService privacy) : ControllerBase
{
    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            throw new UnauthorizedAccessException("User ID not found in token");
        return Guid.Parse(userIdClaim);
    }

    [HttpGet]
    public async Task<ActionResult<List<FriendDto>>> GetFriends()
    {
        var userId = GetUserId();
        var friends = await service.GetFriendsAsync(userId, privacy);
        return Ok(friends);
    }

    [HttpGet("requests")]
    public async Task<ActionResult<List<FriendRequestDto>>> GetPendingRequests()
    {
        var userId = GetUserId();
        var requests = await service.GetPendingRequestsAsync(userId);
        return Ok(requests);
    }

    [HttpGet("search")]
    public async Task<ActionResult<SearchResultDto>> SearchUser([FromQuery] string email)
    {
        var userId = GetUserId();
        var result = await service.SearchByEmailAsync(email, userId);
        if (result == null)
            return NotFound();
        return Ok(result);
    }

    [HttpPost("request/{targetId}")]
    public async Task<IActionResult> SendRequest(Guid targetId)
    {
        var userId = GetUserId();
        try
        {
            await service.SendRequestAsync(userId, targetId);
            return Ok("Friend request sent");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("accept/{requestId}")]
    public async Task<IActionResult> AcceptRequest(Guid requestId)
    {
        var userId = GetUserId();
        try
        {
            await service.AcceptRequestAsync(requestId, userId);
            return Ok("Friend request accepted");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("reject/{requestId}")]
    public async Task<IActionResult> RejectRequest(Guid requestId)
    {
        var userId = GetUserId();
        try
        {
            await service.RejectRequestAsync(requestId, userId);
            return Ok("Friend request rejected");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{friendId}")]
    public async Task<IActionResult> RemoveFriend(Guid friendId)
    {
        var userId = GetUserId();
        await service.RemoveFriendAsync(userId, friendId);
        return Ok("Friend removed");
    }
}
