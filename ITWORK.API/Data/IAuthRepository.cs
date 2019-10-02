using System.Threading.Tasks;
using ITWORK.API.Modules;

namespace ITWORK.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username, string password);
    }
}