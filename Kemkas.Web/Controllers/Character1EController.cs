using System.ComponentModel.DataAnnotations;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.FirstEdition.Character;
using Kemkas.Web.Services.Shared;
using Kemkas.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Kemkas.Web.Controllers;

/// <summary>
/// First edition character endpoints
/// </summary>
/// <param name="validationService"></param>
/// <param name="dtoToDbModelService"></param>
/// <param name="dbModelToDtoService"></param>
/// <param name="persistenceService"></param>
[ApiController]
[Route("[controller]")]
public class Character1EController(
    ICharacterValidationService validationService,
    ICharacter1EDtoToDbModelService dtoToDbModelService,
    ICharacterDbModelToDtoService dbModelToDtoService,
    ICharacterPersistenceService persistenceService)
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> StoreNewCharacter([FromBody] Character1eDto dto, [FromQuery]bool isPublic = true)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var errors = validationService.Validate(dto);
        if (errors != null)
        {
            return BadRequest(errors);
        }

        V1Karakter model;
        try
        {
            model = dtoToDbModelService.Convert(dto);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        var id = await persistenceService.StoreNewCharacter1E(model, isPublic);
        return id;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Character1eDto>> GetCharacterById([FromRoute] Guid id)
    {
        var entity = await persistenceService.GetCharacter1EById(id);
        if (entity is null)
        {
            return NotFound();
        }

        return dbModelToDtoService.Convert(entity);
    }
    
    [HttpPost("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateCharacter([FromRoute] Guid id, [FromBody] Character1eDto dto, [FromQuery]bool isPublic = true)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var errors = validationService.Validate(dto);
        if (errors != null)
        {
            return BadRequest(errors);
        }

        var original = await persistenceService.GetCharacter1EById(id, tracking: true);
        if (original is null)
        {
            return NotFound();
        }
        
        dtoToDbModelService.Update(original, dto);

        await persistenceService.UpdateCharacter1E(original, isPublic);

        return id;
    }

}