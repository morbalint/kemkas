using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Kemkas.Web.Db.Enums;

namespace Kemkas.Web.Db.Models;

public class V2KarakterKepzettseg
{
    [Key]
    public Guid Id { get; set; }
    public Guid KarakterId { get; set; }
    public Kepzettseg2E Kepzettseg { get; set; }
    public bool IsTolvajKepzettseg { get; set; } = false;
    
    [ForeignKey(nameof(KarakterId))]
    public virtual V2Karakter Karakter { get; set; }
}