using Microsoft.EntityFrameworkCore;
using VacantionDestinationsAPI.Models;

namespace VacantionDestinationsAPI.Context
{
    public class DestinationContext : DbContext
    {
        public DestinationContext() { }

        public DestinationContext(DbContextOptions<DestinationContext> options) : base(options)
        {
            // EnsureDeleted to skip migrations
            // delete to keep data between runs
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set Cost default value to 1000.00
            modelBuilder.Entity<Destination>()
                .Property(d => d.Cost)
                .HasDefaultValue(100.00);

            // Define unique constraints
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }

        public virtual DbSet<User> Users { get; set; } = null!;

        public virtual DbSet<Destination> Destinations { get; set; } = null!;
    }
}
