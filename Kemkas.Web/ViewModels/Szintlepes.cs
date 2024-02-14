using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

public struct Szintlepes
{
    [JsonPropertyName("osztaly")]
    public string Osztaly { get; set; }

    [JsonPropertyName("HProll")]
    public byte HProll { get; set; }
    
    [JsonPropertyName("tolvajExtraKepzettseg")]
    public string? TolvajExtraKepzettseg { get; set; }
    
    [JsonPropertyName("harcosFegyver")]
    public string? HarcosFegyver { get; set; }
    
    [JsonPropertyName("kalozKritikus")]
    public string? KalozKritikus { get; set; }
    
    [JsonPropertyName("tulajdonsagNoveles")]
    public string? TulajdonsagNoveles { get; set; }
}