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
    ICharacterPersistenceService persistenceService,
    ICharacterDbModelToDto2EService dbModelToDtoService
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
    
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Character2eDto>> GetCharacterById([FromRoute] Guid id)
    {
        var entity = await persistenceService.GetCharacter2EById(id);
        if (entity is null)
        {
            return NotFound();
        }

        return dbModelToDtoService.Convert(entity);
    }

    [HttpPost("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateCharacter([FromRoute] Guid id, [FromBody] Character2eDto dto, [FromQuery]bool isPublic = true)
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

        var original = await persistenceService.GetCharacter2EById(id, tracking: true);
        if (original is null)
        {
            return NotFound();
        }

        try
        {
            dtoToDbModelService.Update(original, dto);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }

        await persistenceService.UpdateCharacter2E(original, isPublic);

        return id;
    }
}