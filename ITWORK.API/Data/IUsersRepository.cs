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
         Task<bool> OrgExists(int userid);
         Task<Organization> GetOrganization(int id);
         Task<IEnumerable<Organization>> GetOrganizations();
         Task<Follow> GetFollow(int userId, int recipientId);
    }
}