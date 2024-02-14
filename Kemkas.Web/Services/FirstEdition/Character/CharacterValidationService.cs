using Kemkas.Web.ViewModels;

namespace Kemkas.Web.Services.FirstEdition.Character;

public interface ICharacterValidationService
{
    public string? Validate(Character1eDto dto);
}

public class CharacterValidationService : ICharacterValidationService
{
    public string? Validate(Character1eDto dto)
    {
        // TODO: add validation!!
        return null;
    }
}
