using System.Collections.Generic;
using System.Threading.Tasks;
using ITWORK.API.Modules;

namespace ITWORK.API.Data
{
    public interface IUsersRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         Task<Organization> GetOrganization(int id);
         Task<IEnumerable<Organization>> GetOrganizations();
         Task<bool> OrgExists(int userid);
         Task<Organization> CreateOrganization(Organization organization);
    }
}