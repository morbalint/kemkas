using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Kemkas.Web.Db.Enums;

namespace Kemkas.Web.Db.Models;

/// <summary>
/// 2nd edition character sheet
/// </summary>
public class V2Karakter
{
    [Key] public Guid Id { get; set; }
    public bool IsPublic { get; set; } = false;
    public int? OwnerUserId { get; set; }
    
    public string Nev { get; set; }
    public string? Nem { get; set; }
    public double? Kor { get; set; }
    public Jellem Jellem { get; set; } = Jellem.Semleges;
    public string? Isten { get; set; }
    public Faj2E Faj { get; set; } = Faj2E.Ember;
    public byte Ero { get; set; }
    public byte Ugyesseg { get; set; }
    public byte Egeszseg { get; set; }
    public byte Intelligencia { get; set; }
    public byte Bolcsesseg { get; set; }
    public byte Karizma { get; set; }
    public byte Szint { get; set; } = 1;

    public string? Pancel { get; set; }
    public string? Pajzs { get; set; }
    
    [ForeignKey(nameof(OwnerUserId))]
    public ApplicationUser? OwnerUser { get; set; }
    
    [InverseProperty(nameof(V2KarakterKepzettseg.Karakter))]
    public virtual IEnumerable<V2KarakterKepzettseg> KarakterKepzettsegek { get; set; }
    
    [InverseProperty(nameof(V2Szintlepes.Karakter))]
    public virtual IEnumerable<V2Szintlepes> Szintlepesek { get; set; }
    
    [InverseProperty(nameof(V2Felszereles.Karakter))]
    public virtual IEnumerable<V2Felszereles> Felszereles { get; set; }
}