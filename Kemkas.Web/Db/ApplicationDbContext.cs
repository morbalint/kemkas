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
    
    public DbSet<V1Karakter> Karakterek { get; set; }
    
    public DbSet<V1KarakterKepzettseg> KarakterKepzettsegek { get; set; }
    
    public DbSet<V1Szintlepes> Szintlepesek { get; set; }
    
    public DbSet<V1Felszereles> Felszerelesek { get; set; }
    
}
