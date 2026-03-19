using Microsoft.EntityFrameworkCore;
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

        modelBuilder.Entity<Friend>()
            .HasOne(f => f.User)
            .WithMany(u => u.Friends)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Friend>()
            .HasOne(f => f.FriendUser)
            .WithMany(u => u.FriendOf)
            .HasForeignKey(f => f.FriendId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<CategoryBadge>()
            .HasOne(cb => cb.User)
            .WithMany(u => u.CategoryBadges)
            .HasForeignKey(cb => cb.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProfileBadge>()
            .HasOne(pb => pb.User)
            .WithOne(u => u.ProfileBadge)
            .HasForeignKey<ProfileBadge>(pb => pb.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Challenge>()
            .HasOne(c => c.Category)
            .WithMany(c => c.Challenges)
            .HasForeignKey(c => c.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserChallenge>()
            .HasOne(uc => uc.User)
            .WithMany(u => u.UserChallenges)
            .HasForeignKey(uc => uc.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserChallenge>()
            .HasOne(uc => uc.Challenge)
            .WithMany(c => c.UserChallenges)
            .HasForeignKey(uc => uc.ChallengeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}