using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Entities;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChallengeController : ControllerBase
{
    private readonly MyDbContext _ctx;
    private readonly ChallengeService _service;

    public ChallengeController(MyDbContext ctx, ChallengeService service)
    {
        _ctx = ctx;
        _service = service;
    }

    [HttpGet(nameof(GetAllPossibleChallenges))]
    public List<ChallengeDto> GetAllPossibleChallenges()
    {
        var challenges = _ctx.Challenges.Where(u => u.IsActive && u.EndDate > DateTime.UtcNow).ToHashSet();
        return _service.ConverChallengeToChallangeDto(challenges);
    }


    [HttpGet(nameof(GetAllActiveChallenges))]
    public async Task<List<ChallengeDto>> GetAllActiveChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await _ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId))
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();

        return _service.ConvertToChallengeDto(userChallenges);
    }

    [HttpGet(nameof(GetAllCompletedChallenges))]
    public async Task<List<ChallengeDto>> GetAllCompletedChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await _ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId) && uc.TimesCompleted > 0)
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();
        return _service.ConvertToChallengeDto(userChallenges);
    }

    [HttpGet(nameof(GetAllPendingChallenges))]
    public async Task<List<ChallengeDto>> GetAllPendingChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await _ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId) && uc.TimesCompleted == 0)
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();
        return _service.ConvertToChallengeDto(userChallenges);
    }

    [HttpPost(nameof(FinishChallenge))]
    public async Task<IActionResult> FinishChallenge([FromBody] FinishChallengeRequestDto request)
    {
        ChallengeService.CheckNullUserId(request.UserId.ToString());
        var userChallenge = await _ctx.UserChallenges.FirstOrDefaultAsync(uc =>
            uc.UserId == request.UserId && uc.ChallengeId == request.ChallengeId);
        if (userChallenge == null)
        {
            return NotFound("User challenge not found.");
        }

        userChallenge.IsCompleted = request.isFinished;
        if (request.isFinished)
        {
            userChallenge.TimesCompleted = (userChallenge.TimesCompleted ?? 0) + 1;
        }
        else
        {
            userChallenge.TimesCompleted = (userChallenge.TimesCompleted ?? 1) - 1;
        }

        await _ctx.SaveChangesAsync();
        return Ok("Challenge status updated successfully.");
    }

    [HttpPost(nameof(ActivateChallenge))]
    public async Task<IActionResult> ActivateChallenge([FromBody] ActivateChallengeRequestDto request)
    {
        ChallengeService.CheckNullUserId(request.UserId.ToString());
        var challenge = await _ctx.Challenges.FirstOrDefaultAsync(c => c.Id == request.ChallengeId && c.IsActive);
        var userChallenge = new UserChallenge
        {
            ChallengeId = request.ChallengeId,
            UserId = request.UserId,
            IsCompleted = false,
            TimesCompleted = 0,
            IsRepeateble = challenge?.IsRepeateble ?? false
        };
        _ctx.UserChallenges.Add(userChallenge);
        await _ctx.SaveChangesAsync();
        return Ok("Challenge activated successfully.");
    }
}