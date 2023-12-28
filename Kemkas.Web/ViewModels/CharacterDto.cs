using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

public struct CharacterDto
{
    [Required]
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("nem")]
    public string? Nem { get; set; }
    
    [JsonPropertyName("kor")]
    public double? Kor { get; set; }
    
    [JsonPropertyName("jellem")]
    public string Jellem { get; set; }
    
    [JsonPropertyName("isten")]
    public string? Isten { get; set; }
    
    [JsonPropertyName("faj")]
    public string Faj { get; set; }
    
    [JsonPropertyName("osztaly")]
    public string Osztaly { get; set; }
    
    [JsonPropertyName("tulajdonsagok")]
    public KarakterTulajdonsagokDto Tulajdonsagok { get; set; }
    
    [JsonPropertyName("kepzettsegek")]
    public IList<string> Kepzettsegek { get; set; }
    
    [JsonPropertyName("tolvajkepzettsegek")]
    public IList<string>? Tolvajkepzettsegek { get; set; } 
    
    [JsonPropertyName("szint")]
    public byte Szint { get; set; }
    
    [JsonPropertyName("hpRolls")]
    public IList<byte> HpRolls { get; set; }
    
    [JsonPropertyName("tulajdonsagNovelesek")]
    public IList<string> TulajdonsagNovelesek { get; set; }
    
    [JsonPropertyName("harcosSpecializaciok")]
    public IList<string> HarcosSpecializaciok { get; set; }
    
    [JsonPropertyName("kalozKritikus")]
    public IList<string> KalozKritikus { get; set; }
    
    [JsonPropertyName("felszereles")]
    public KarakterFelszerelesDto Felszereles { get; set; }

    public bool? IsPublic { get; set; }
}