using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.Character;

public interface ICharacterValidationService
{
    public string? Validate(CharacterDto dto);
}

public class CharacterValidationService : ICharacterValidationService
{
    public string? Validate(CharacterDto dto)
    {
        // TODO: add validation!!
        return null;
    }
}
