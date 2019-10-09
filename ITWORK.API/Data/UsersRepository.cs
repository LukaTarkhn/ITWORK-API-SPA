using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITWORK.API.Modules;
using Microsoft.EntityFrameworkCore;

namespace ITWORK.API.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        public UsersRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity); 
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Organization> GetOrganization(int id)
        {
            var organization = await _context.Organizations.FirstOrDefaultAsync(p => p.UserId == id);

            return organization;
        }

        public async Task<IEnumerable<Organization>> GetOrganizations()
        {
            var organizations = await _context.Organizations.ToListAsync();
            
            return organizations;
        }

        public async Task<bool> OrgExists(int userid)
        {
            if (await _context.Organizations.AnyAsync(x => x.UserId == userid))
                return true;

            return false;
        }

        public async Task<Organization> CreateOrganization(Organization organization)
        {
            await _context.Organizations.AddAsync(organization);
            await _context.SaveChangesAsync();

            return organization;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).Include(p => p.Organizations).FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}