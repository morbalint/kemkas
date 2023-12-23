using Kemkas.Web.Db;
using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.Identity;
using Kemkas.Web.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Kemkas.Web.Services.Character;

public interface ICharacterPersistenceService
{
    public Task<Guid> StoreNewCharacter(V1Karakter karakter, bool isPublic = false);
    
    public Task<V1Karakter?> GetCharacterById(Guid id);

    public Task<List<CharacterListItemDto>> GetAllCharactersOfUser();
}

public class CharacterPersistenceService(
    ApplicationDbContext dbContext,
    ICurrentUserService currentUserService
    ) : ICharacterPersistenceService
{

    public async Task<Guid> StoreNewCharacter(V1Karakter karakter, bool isPublic = false)
    {
        var currentUser = await currentUserService.GetCurrentUser();
        karakter.OwnerUserId = currentUser?.Id;
        karakter.Id = Guid.Empty;
        karakter.IsPublic = isPublic;
        dbContext.Karakterek.Add(karakter);
        await dbContext.SaveChangesAsync();
        return karakter.Id;
    }

    public async Task<V1Karakter?> GetCharacterById(Guid id)
    {
        var entity = await dbContext.Karakterek
            .Include(x => x.KarakterKepzettsegek)
            .Include(x => x.Szintlepesek)
            .Include(x => x.Felszereles)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (entity?.OwnerUserId is null || entity.IsPublic)
        {
            return entity;
        }
        
        var currentUser = await currentUserService.GetCurrentUser();
        return entity.OwnerUserId == currentUser?.Id ? entity : null;
    }

    public async Task<List<CharacterListItemDto>> GetAllCharactersOfUser()
    {
        var currentUser = await currentUserService.GetCurrentUser();
        if (currentUser is null)
        {
            return [];
        }

        var characters = await dbContext.Karakterek
            .Where(k => k.OwnerUserId == currentUser.Id)
            .Select(k => new CharacterListItemDto
            {
                Id = k.Id,
                Name = k.Nev,
                Szint = k.Szint,
                Faj = k.Faj.Convert(),
                Osztaly = k.Osztaly.Convert(),
            })
            .ToListAsync();

        return characters;
    }
}