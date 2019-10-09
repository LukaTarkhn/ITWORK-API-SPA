using ITWORK.API.Modules;
using Microsoft.EntityFrameworkCore;

namespace ITWORK.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
    
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Organization> Organizations { get; set; }
    }
}