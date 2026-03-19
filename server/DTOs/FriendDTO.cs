namespace server.DTOs;

public class FriendDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int FriendId { get; set; }
    public bool isBestFriend { get; set; }
}