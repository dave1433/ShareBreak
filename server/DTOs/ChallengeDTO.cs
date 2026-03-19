namespace server.DTOs;

public class ChallengeDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public bool IsActive { get; set; }
    public bool IsRepeatable { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? TimesCompleted { get; set; }
}

public class FinishChallengeRequestDto
{
    public Guid UserId { get; set; }
    public Guid ChallengeId { get; set; }
    public bool isFinished { get; set; }
    public DateTime? FinishDate { get; set; }
}

public class ActivateChallengeRequestDto
{
    public Guid UserId { get; set; }
    public Guid ChallengeId { get; set; }
}