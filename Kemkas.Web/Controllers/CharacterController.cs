using Kemkas.Web.Services.FirstEdition.Character;
using Kemkas.Web.Services.Shared;
using Kemkas.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kemkas.Web.Controllers;

/// <summary>
/// Shared first and second edition character endpoints
/// </summary>
/// <param name="persistenceService"></param>
[ApiController]
[Route("[controller]")]
public class CharacterController(ICharacterPersistenceService persistenceService) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<List<CharacterListItemDto>> GetAllCharacters()
    {
        return await persistenceService.GetAllCharactersOfUser();
    }
}