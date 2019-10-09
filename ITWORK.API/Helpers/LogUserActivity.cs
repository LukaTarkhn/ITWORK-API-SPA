using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ITWORK.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace ITWORK.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IUsersRepository>();
            var user = await repo.GetUser(userId);
            user.LastAction = DateTime.Now;
            await repo.SaveAll();
        }
    }
}