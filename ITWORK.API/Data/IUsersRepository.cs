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
         Task<Organization> GetOrganizationById(int id);
         Task<OrganizationPhoto> GetOrganizationPhoto(int id);
         Task<OrganizationHeadPhoto> GetOrganizationHeadPhoto(int id);
         Task<OrganizationPhoto> GetMainPhotoForOrganization(int organizationId);
         Task<OrganizationHeadPhoto> GetMainHeadPhotoForOrganization(int organizationId);
         Task<PagedList<Organization>> GetOrganizations(OrganizationParams organizationParams);
         Task<Follow> GetFollow(int userId, int recipientId);
         Task<OrganizationFollow> GetOrganizationFollow(int userId, int organizationId);
        Task<PagedList<User>> GetOrganizationFollowers(UserParams userParams);
         Task<Message> GetMessage(int id);
         Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
         Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}