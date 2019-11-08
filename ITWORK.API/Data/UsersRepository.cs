using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITWORK.API.Helpers;
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

        public async Task<OrganizationPhoto> GetMainPhotoForOrganization(int organizationId)
        {
            return await _context.OrganizationPhotos.Where(u => u.OrganizationId == organizationId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<OrganizationHeadPhoto> GetMainHeadPhotoForOrganization(int organizationId)
        {
            return await _context.OrganizationHeadPhotos.Where(u => u.OrganizationId == organizationId).FirstOrDefaultAsync(p => p.IsMain);
        }
        
        public async Task<Organization> GetOrganization(int userId, int id)
        {
            var organization = await _context.Organizations
                .Include(x => x.OrganizationPhotos)
                .Include(x => x.OrganizationHeadPhotos)
                .FirstOrDefaultAsync(p => p.Id == id);

            return organization;
        }

        public async Task<Organization> GetOrganizationById(int id)
        {
            var organization = await _context.Organizations
                .Include(x => x.OrganizationPhotos)
                .Include(x => x.OrganizationHeadPhotos)
                .FirstOrDefaultAsync(p => p.Id == id);

            return organization;
        }

        public async Task<PagedList<Organization>> GetOrganizations(OrganizationParams organizationParams)
        {
            var organizations = _context.Organizations
                .Include(x => x.OrganizationPhotos)
                .Include(x => x.OrganizationHeadPhotos)
                .Include(x => x.OrganizationFollowers).AsQueryable();

            if (organizationParams.Followees) 
            {
                var follows = await _context.OrganizationFollowers.Where(u => u.FollowerId == organizationParams.UserId).ToListAsync();
                var followedOrganizationId = follows.Select(i => i.FolloweeId);
                organizations = organizations.Where(u => followedOrganizationId.Contains(u.Id));
            }
                
            

            return await PagedList<Organization>.CreateAsync(organizations, organizationParams.PageNumber, organizationParams.PageSize);
        }

        public async Task<PagedList<User>> GetOrganizationFollowers(UserParams userParams)
        {
            var users =  _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastAction).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            var follows = await _context.OrganizationFollowers.Where(u => u.FolloweeId == userParams.OrganizationId).ToListAsync();
            var followedOrganizationId = follows.Select(i => i.FollowerId);
            users = users.Where(u => followedOrganizationId.Contains(u.Id));

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<OrganizationPhoto> GetOrganizationPhoto(int id)
        {
            var organizationPhoto = await _context.OrganizationPhotos.FirstOrDefaultAsync(p => p.Id == id);

            return organizationPhoto;
        }

        public async Task<OrganizationHeadPhoto> GetOrganizationHeadPhoto(int id)
        {
            var organizationHeadPhoto = await _context.OrganizationHeadPhotos.FirstOrDefaultAsync(p => p.Id == id);

            return organizationHeadPhoto;
        }

        public async Task<bool> OrgExists(string name)
        {
            if (await _context.Organizations.AnyAsync(x => x.Name == name))
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
            var user = await _context.Users
                .Include(p => p.Photos)
                .Include(o => o.Organizations)
                .Include(x => x.OrganizationPhotos)
                .Include(x => x.OrganizationHeadPhotos)
                .FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users =  _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastAction).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            if (userParams.Followers)
            {
                var userFollowers = await GetUserFollows(userParams.UserId, userParams.Followers);
                users = users.Where(u => userFollowers.Contains(u.Id));
            }

            if (userParams.Followees)
            {
                var userFollowees = await GetUserFollows(userParams.UserId, userParams.Followers);
                users = users.Where(u => userFollowees.Contains(u.Id));
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<IEnumerable<int>> GetUserFollows(int id, bool Followers)
        {
            var user = await _context.Users
                .Include(x => x.Followers)
                .Include(x => x.Followees)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (Followers)
            {
                return user.Followers.Where(u => u.FolloweeId == id).Select(i => i.FollowerId);
            }
            else
            {
                return user.Followees.Where(u => u.FollowerId == id).Select(i => i.FolloweeId);
            }
        }

        public async Task<Follow> GetFollow(int userId, int recipientId)
        {
            return await _context.Followers.FirstOrDefaultAsync(u => 
                u.FollowerId == userId && u.FolloweeId == recipientId);
        }

        public async Task<OrganizationFollow> GetOrganizationFollow(int userId, int organizationId)
        {
            return await _context.OrganizationFollowers.FirstOrDefaultAsync(u => 
                u.FollowerId == userId && u.FolloweeId == organizationId);
        }
        
        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
            .AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false && u.IsRead == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
            .Where(m => m.RecipientId == userId && m.RecipientDeleted == false
                && m.SenderId == recipientId 
                || m.RecipientId == recipientId && m.SenderId == userId 
                && m.SenderDeleted == false)
            .OrderByDescending(m => m.MessageSent)
            .ToListAsync();

            return messages;
        }
    }
}