namespace server.Entities;

public class Friend
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int FriendId { get; set; }
    public bool isBestFriend { get; set; }
}