using Kemkas.Web.Db.Models;
using Microsoft.AspNetCore.Identity;

namespace Kemkas.Web.Services.Identity;

public interface ICurrentUserService
{
    public Task<ApplicationUser?> GetCurrentUser();

    public Task<ApplicationUser> GetCurrentUserOrThrow();
}

public class CurrentUserService(
    IHttpContextAccessor httpContextAccessor,
    UserManager<ApplicationUser> userManager
    ) : ICurrentUserService
{
    private ApplicationUser? _user;
    
    public async Task<ApplicationUser?> GetCurrentUser()
    {
        if (_user is not null)
        {
            return _user;
        }

        var userName = httpContextAccessor.HttpContext?.User.Identity?.Name;
        if (userName is null)
        {
            return null;
        }

        _user = await userManager.FindByNameAsync(userName);
        return _user;
    }

    public async Task<ApplicationUser> GetCurrentUserOrThrow()
    {
        return await GetCurrentUser() ?? throw new InvalidOperationException("no current user!");
    }
}