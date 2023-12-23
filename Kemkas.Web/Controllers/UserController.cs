using Kemkas.Web.Db.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Kemkas.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    // GET
    [HttpGet("me")]
    public async Task<string?> Me([FromServices] UserManager<ApplicationUser> userManager)
    {
        var user = await userManager.GetUserAsync(User);
        return user?.UserName ?? user?.Email;
    }
}