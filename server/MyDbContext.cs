using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using server.Entities;

namespace server;

public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Friend> Friends { get; set; } = null!;
    public DbSet<CategoryBadge> CategoryBadges { get; set; } = null!;
    public DbSet<ProfileBadge> ProfileBadges { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Challenge> Challenges { get; set; } = null!;
    public DbSet<UserChallenge> UserChallenges { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique email per user
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configure Friend entity relationships
        modelBuilder.Entity<Friend>()
            .HasOne(f => f.User)
            .WithMany(u => u.Friends)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}