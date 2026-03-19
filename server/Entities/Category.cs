namespace server.Entities;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public List<Challenge> Challenges { get; set; } = new();
}