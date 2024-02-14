using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Kemkas.Web.Db.Enums;

namespace Kemkas.Web.Db.Models;

public class V2Szintlepes
{
    [Key]
    public Guid Id { get; set; }
    public Guid KarakterId { get; set; }
    
    // this is also used for ordering the level ups
    public byte KarakterSzint { get; set; }
    
    public Osztaly2E Osztaly { get; set; }
    
    public byte HpRoll { get; set; }
    public Tulajdonsag? TulajdonsagNoveles { get; set; }
    
    // used for both Kaloz/Tengeresz and Harcos
    public string? FegyverSpecializacio { get; set; }
    
    // for the 9th level Tolvaj specialty
    public Kepzettseg2E? TolvajExtraKepzettseg { get; set; }
    
    [ForeignKey(nameof(KarakterId))]
    public virtual V2Karakter Karakter { get; set; }
}