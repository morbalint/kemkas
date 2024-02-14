using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kemkas.Web.Db.Models;

public class V2Felszereles
{
    [Key]
    public Guid Id { get; set; }
    public Guid KarakterId { get; set; }
    
    public string TargyId { get; set; }
    public bool IsFegyver { get; set; } = true;
    
    [ForeignKey(nameof(KarakterId))]
    public virtual V2Karakter Karakter { get; set; }
}