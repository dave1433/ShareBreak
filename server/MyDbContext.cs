using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server;

public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Friend> Friends { get; set; } = null!;
    public DbSet<CategoryBadge> CategoryBadges { get; set; } = null!;
    public DbSet<ProfileBadge> ProfileBadges { get; set; } = null!;
}