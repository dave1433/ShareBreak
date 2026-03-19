namespace server.Entities;

public class UserChallenge
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ChallengeId { get; set; }
    public bool? IsCompleted { get; set; }
    public bool? IsRepeateble { get; set; }
    public int? TimesCompleted { get; set; }
    
}