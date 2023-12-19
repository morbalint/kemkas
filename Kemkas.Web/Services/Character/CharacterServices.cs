using Kemkas.Web.Services.Identity;

namespace Kemkas.Web.Services.Character;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCharacterServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICurrentUserService, CurrentUserService>();
        
        serviceCollection.AddTransient<ICharacterValidationService, CharacterValidationService>();
        serviceCollection.AddTransient<ICharacterDtoToDbModelService, CharacterDtoToDbModelService>();
        serviceCollection.AddTransient<ICharacterDbModelToDtoService, CharacterDbModelToDtoService>();
        serviceCollection.AddScoped<ICharacterPersistenceService, CharacterPersistenceService>();
        return serviceCollection;
    }
}