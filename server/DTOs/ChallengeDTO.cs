namespace server.DTOs;

public class ChallengeDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public bool IsActive { get; set; }
    public bool IsRepeatable { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? TimesCompleted { get; set; }
}