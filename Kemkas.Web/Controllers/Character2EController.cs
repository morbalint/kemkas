using System.ComponentModel.DataAnnotations;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.SecondEdition.Character;
using Kemkas.Web.Services.Shared;
using Kemkas.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Kemkas.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class Character2EController(
    ICharacter2EDtoToDbModelService dtoToDbModelService, 
    ICharacterPersistenceService persistenceService
    ) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> StoreNewCharacter([FromBody] Character2eDto dto, [FromQuery]bool isPublic = true)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        // var errors = validationService.Validate(dto);
        // if (errors != null)
        // {
        //     return BadRequest(errors);
        // }

        V2Karakter model;
        try
        {
            model = dtoToDbModelService.Convert(dto);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        var id = await persistenceService.StoreNewCharacter2E(model, isPublic);
        return id;
    }

}