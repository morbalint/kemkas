namespace Kemkas.Web.Services.SecondEdition.Character;

public static class ServiceCollectionExtensions 
{
    public static IServiceCollection AddCharacter2EServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<ICharacter2EDtoToDbModelService, Character2EDtoToDbModelService>();
        serviceCollection.AddTransient<ICharacterDbModelToDto2EService, CharacterDbModelToDto2EService>();
        return serviceCollection;
    }
}