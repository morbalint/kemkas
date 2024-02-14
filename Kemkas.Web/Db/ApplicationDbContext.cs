using Kemkas.Web.Db.Models;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Kemkas.Web.Db;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>, IDataProtectionKeyContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }
    
    // 1st edition character
    
    public DbSet<V1Karakter> Karakterek { get; set; }
    
    public DbSet<V1KarakterKepzettseg> KarakterKepzettsegek { get; set; }
    
    public DbSet<V1Szintlepes> Szintlepesek { get; set; }
    
    public DbSet<V1Felszereles> Felszerelesek { get; set; }
    
    // 2nd edition character
    
    public DbSet<V2Karakter> Karakterek2E { get; set; }
    
    public DbSet<V2KarakterKepzettseg> KarakterKepzettsegek2E { get; set; }
    
    public DbSet<V2Szintlepes> Szintlepesek2E { get; set; }
    
    public DbSet<V2Felszereles> Felszerelesek2E { get; set; }
}
