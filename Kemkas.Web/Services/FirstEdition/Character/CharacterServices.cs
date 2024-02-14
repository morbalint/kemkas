using Kemkas.Web.Services.Identity;
using Kemkas.Web.Services.Shared;

namespace Kemkas.Web.Services.FirstEdition.Character;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCharacterServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICurrentUserService, CurrentUserService>();
        
        serviceCollection.AddTransient<ICharacterValidationService, CharacterValidationService>();
        serviceCollection.AddTransient<ICharacter1EDtoToDbModelService, Character1EDtoToDbModelService>();
        serviceCollection.AddTransient<ICharacterDbModelToDtoService, CharacterDbModelToDtoService>();
        serviceCollection.AddScoped<ICharacterPersistenceService, CharacterPersistenceService>();
        return serviceCollection;
    }
}