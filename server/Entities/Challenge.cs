namespace server.Entities;

public class Challenge
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public bool IsActive { get; set; }
    public bool IsRepeateble { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Points { get; set; }
    
}