using System.Collections.Generic;
using System.Threading.Tasks;
using ITWORK.API.Helpers;
using ITWORK.API.Modules;

namespace ITWORK.API.Data
{
    public interface IUsersRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         Task<Organization> CreateOrganization(Organization organization);
         Task<bool> OrgExists(string name);
         Task<Organization> GetOrganization(int userId, int id);
         Task<IEnumerable<Organization>> GetOrganizations();
         Task<Follow> GetFollow(int userId, int recipientId);
         Task<Message> GetMessage(int id);
         Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
         Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}