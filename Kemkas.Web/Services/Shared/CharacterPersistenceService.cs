using Kemkas.Web.Db;
using Kemkas.Web.Db.Enums;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.Identity;
using Kemkas.Web.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Kemkas.Web.Services.Shared;

public interface ICharacterPersistenceService
{
    public Task<Guid> StoreNewCharacter1E(V1Karakter karakter, bool isPublic = false);
    
    public Task<Guid> StoreNewCharacter2E(V2Karakter karakter, bool isPublic = false);
    
    public Task<V1Karakter?> GetCharacter1EById(Guid id, bool tracking = false);
    
    public Task<V2Karakter?> GetCharacter2EById(Guid id, bool tracking = false);

    public Task<List<CharacterListItemDto>> GetAllCharactersOfUser();
    
    public Task UpdateCharacter1E(V1Karakter karakter, bool isPublic = false);
    
    public Task UpdateCharacter2E(V2Karakter karakter, bool isPublic = false);
}

public class CharacterPersistenceService(
    ApplicationDbContext dbContext,
    ICurrentUserService currentUserService
    ) : ICharacterPersistenceService
{

    public async Task<Guid> StoreNewCharacter1E(V1Karakter karakter, bool isPublic = false)
    {
        var currentUser = await currentUserService.GetCurrentUser();
        karakter.OwnerUserId = currentUser?.Id;
        karakter.Id = Guid.Empty;
        karakter.IsPublic = isPublic;
        dbContext.Karakterek.Add(karakter);
        await dbContext.SaveChangesAsync();
        return karakter.Id;
    }

    public async Task<Guid> StoreNewCharacter2E(V2Karakter karakter, bool isPublic = false)
    {
        var currentUser = await currentUserService.GetCurrentUser();
        karakter.OwnerUserId = currentUser?.Id;
        karakter.Id = Guid.Empty;
        karakter.IsPublic = isPublic;
        dbContext.Karakterek2E.Add(karakter);
        await dbContext.SaveChangesAsync();
        return karakter.Id;
    }

    public async Task<V1Karakter?> GetCharacter1EById(Guid id, bool tracking = false)
    {
        IQueryable<V1Karakter> queriable = dbContext.Karakterek.Include(x => x.KarakterKepzettsegek)
            .Include(x => x.Szintlepesek)
            .Include(x => x.Felszereles);

        queriable = tracking ? queriable.AsTracking() : queriable.AsNoTracking(); 
        
        var entity = await queriable
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (entity?.OwnerUserId is null || entity.IsPublic)
        {
            return entity;
        }
        
        var currentUser = await currentUserService.GetCurrentUser();
        return entity.OwnerUserId == currentUser?.Id ? entity : null;
    }

    public async Task<V2Karakter?> GetCharacter2EById(Guid id, bool tracking = false)
    {
        IQueryable<V2Karakter> queriable = dbContext.Karakterek2E.Include(x => x.KarakterKepzettsegek)
            .Include(x => x.Szintlepesek)
            .Include(x => x.Felszereles);

        queriable = tracking ? queriable.AsTracking() : queriable.AsNoTracking(); 
        
        var entity = await queriable
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
                Edition = "1e"
            })
            .ToListAsync();
        
        var characters2E = await dbContext.Karakterek2E
            .Where(k => k.OwnerUserId == currentUser.Id)
            .Select(k => new CharacterListItemDto
            {
                Id = k.Id,
                Name = k.Nev,
                Szint = k.Szint,
                Faj = k.Faj.Convert(),
                Osztaly = "TODO!", // TODO: support for multiclass characters
                Edition = "2e"
            })
            .ToListAsync();

        characters.AddRange(characters2E);
        
        return characters;
    }

    public async Task UpdateCharacter1E(V1Karakter karakter, bool isPublic = false)
    {
        karakter.IsPublic = isPublic;
        dbContext.Karakterek.Attach(karakter);
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateCharacter2E(V2Karakter karakter, bool isPublic = false)
    {
        karakter.IsPublic = isPublic;
        dbContext.Karakterek2E.Attach(karakter);
        await dbContext.SaveChangesAsync();
    }
}