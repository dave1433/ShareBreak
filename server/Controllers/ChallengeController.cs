using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Entities;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChallengeController(MyDbContext ctx, ChallengeService service) : ControllerBase
{
    [HttpGet(nameof(GetAllPossibleChallenges))]
    public List<ChallengeDto> GetAllPossibleChallenges()
    {
        var challenges = ctx.Challenges.Where(u => u.IsActive && u.EndDate > DateTime.UtcNow).ToHashSet();
        return service.ConverChallengeToChallangeDto(challenges);
    }


    [HttpGet(nameof(GetAllActiveChallenges))]
    public async Task<List<ChallengeDto>> GetAllActiveChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId))
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();

        return service.ConvertToChallengeDto(userChallenges);
    }

    [HttpGet(nameof(GetAllCompletedChallenges))]
    public async Task<List<ChallengeDto>> GetAllCompletedChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId) && uc.TimesCompleted > 0)
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();
        return service.ConvertToChallengeDto(userChallenges);
    }

    [HttpGet(nameof(GetAllPendingChallenges))]
    public async Task<List<ChallengeDto>> GetAllPendingChallenges([FromQuery] string userId)
    {
        ChallengeService.CheckNullUserId(userId);

        var userChallenges = await ctx.UserChallenges
            .Where(uc => uc.UserId == Guid.Parse(userId) && uc.TimesCompleted == 0)
            .Include(uc => uc.Challenge)
            .ToHashSetAsync();
        return service.ConvertToChallengeDto(userChallenges);
    }

    [HttpPost(nameof(FinishChallenge))]
    public async Task<IActionResult> FinishChallenge([FromBody] FinishChallengeRequestDto request)
    {
        ChallengeService.CheckNullUserId(request.UserId.ToString());
        var userChallenge = await ctx.UserChallenges.FirstOrDefaultAsync(uc =>
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

        await ctx.SaveChangesAsync();
        return Ok("Challenge status updated successfully.");
    }

    [HttpPost(nameof(ActivateChallenge))]
    public async Task<IActionResult> ActivateChallenge([FromBody] ActivateChallengeRequestDto request)
    {
        ChallengeService.CheckNullUserId(request.UserId.ToString());
        var challenge = await ctx.Challenges.FirstOrDefaultAsync(c => c.Id == request.ChallengeId && c.IsActive);
        var userChallenge = new UserChallenge
        {
            ChallengeId = request.ChallengeId,
            UserId = request.UserId,
            IsCompleted = false,
            TimesCompleted = 0,
            IsRepeateble = challenge?.IsRepeateble ?? false
        };
        ctx.UserChallenges.Add(userChallenge);
        await ctx.SaveChangesAsync();
        return Ok("Challenge activated successfully.");
    }
}