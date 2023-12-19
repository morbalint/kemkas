using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Kemkas.Web.Db.Enums;

namespace Kemkas.Web.Db.Models;

public class V1Szintlepes
{
    [Key]
    public Guid Id { get; set; }
    public Guid KarakterId { get; set; }
    
    public byte KarakterSzint { get; set; }
    
    // for multiclass characters
    // public Osztaly Osztaly { get; set; }
    //
    // public byte OsztalySzint { get; set; }
    
    public byte HpRoll { get; set; }
    public Tulajdonsag? TulajdonsagNoveles { get; set; }
    public string? FegyverSpecializacio { get; set; }
    
    [ForeignKey(nameof(KarakterId))]
    public virtual V1Karakter Karakter { get; set; }
}