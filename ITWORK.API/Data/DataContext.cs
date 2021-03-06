using ITWORK.API.Modules;
using Microsoft.EntityFrameworkCore;

namespace ITWORK.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
    
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Follow> Followers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OrganizationPhoto> OrganizationPhotos { get; set; }
        public DbSet<OrganizationHeadPhoto> OrganizationHeadPhotos { get; set; }
        public DbSet<OrganizationFollow> OrganizationFollowers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Follow>()
            .HasKey(k => new { k.FollowerId, k.FolloweeId });

            builder.Entity<Follow>()
            .HasOne(u => u.Followee)
            .WithMany(u => u.Followers)
            .HasForeignKey(u => u.FolloweeId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Follow>()
            .HasOne(u => u.Follower)
            .WithMany(u => u.Followees)
            .HasForeignKey(u => u.FollowerId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessagesRecieved)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<OrganizationFollow>()
            .HasKey(k => new { k.FollowerId, k.FolloweeId });
        }  
    }
}