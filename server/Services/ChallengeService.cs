using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Entities;

namespace server.Services;

public class ChallengeService(MyDbContext ctx)
{
    public static void CheckNullUserId(string? userId)
    {
        if (userId == null)
        {
            throw new ArgumentNullException(nameof(userId), "UserId cannot be null.");
        }
    }

    public List<ChallengeDto> ConvertToChallengeDto(HashSet<UserChallenge> userChallange)
    {
        var listOfChallanges = new List<ChallengeDto>();
        foreach (var challenge in userChallange)
        {
            listOfChallanges.Add(new ChallengeDto
            {
                Id = challenge.ChallengeId,
                Title = challenge.Challenge.Title,
                Description = challenge.Challenge.Description,
                CategoryId = challenge.Challenge.CategoryId,
                IsActive = challenge.Challenge.IsActive,
                IsRepeatable = challenge.Challenge.IsRepeateble,
                StartDate = challenge.Challenge.StartDate,
                EndDate = challenge.Challenge.EndDate,
                TimesCompleted = challenge.TimesCompleted
            });
        }

        return listOfChallanges;
    }

    public List<ChallengeDto> ConverChallengeToChallangeDto(HashSet<Challenge> challange)
    {
        var listOfChallengeDtos = new List<ChallengeDto>();
        foreach (var challenge in challange)
        {
            listOfChallengeDtos.Add(new ChallengeDto
            {
                Id = challenge.Id,
                Title = challenge.Title,
                Description = challenge.Description,
                CategoryId = challenge.CategoryId,
                IsActive = challenge.IsActive,
                IsRepeatable = challenge.IsRepeateble,
                StartDate = challenge.StartDate,
                EndDate = challenge.EndDate
            });
        }

        return listOfChallengeDtos;
    }

    public async Task<bool> CheckIfUserChallengeAlreadyExists(Guid requestUserId, Guid requestChallengeId)
    {
        var userChallenge = await ctx.UserChallenges.FirstOrDefaultAsync(uc =>
            uc.UserId == requestUserId && uc.ChallengeId == requestChallengeId);
        if (userChallenge != null)
        {
            userChallenge.IsCompleted = false;
            ctx.UserChallenges.Update(userChallenge);
            await ctx.SaveChangesAsync();
            return true;
        }
        return false;
    }
}