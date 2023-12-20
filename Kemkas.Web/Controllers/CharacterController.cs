using System.ComponentModel.DataAnnotations;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.Character;
using Kemkas.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Kemkas.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class CharacterController(
    ICharacterValidationService validationService,
    ICharacterDtoToDbModelService dtoToDbModelService,
    ICharacterDbModelToDtoService dbModelToDtoService,
    ICharacterPersistenceService persistenceService)
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> StoreNewCharacter([FromBody] CharacterDto dto)
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
        var id = await persistenceService.StoreNewCharacter(model);
        return id;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CharacterDto>> GetCharacterById([FromRoute] Guid id)
    {
        var entity = await persistenceService.GetCharacterById(id);
        if (entity is null)
        {
            return NotFound();
        }

        return dbModelToDtoService.Convert(entity);
    }
}