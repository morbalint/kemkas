using Kemkas.Web.Db;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.Identity;
using Microsoft.EntityFrameworkCore;

namespace Kemkas.Web.Services.Character;

public interface ICharacterPersistenceService
{
    public Task<Guid> StoreNewCharacter(V1Karakter karakter);
    
    public Task<V1Karakter?> GetCharacterById(Guid id);
}

public class CharacterPersistenceService(
    ApplicationDbContext dbContext,
    ICurrentUserService currentUserService
    ) : ICharacterPersistenceService
{

    public async Task<Guid> StoreNewCharacter(V1Karakter karakter)
    {
        var currentUser = await currentUserService.GetCurrentUser();
        karakter.OwnerUserId = currentUser?.Id;
        karakter.Id = Guid.Empty;
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
}