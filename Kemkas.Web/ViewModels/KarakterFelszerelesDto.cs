using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

public struct KarakterFelszerelesDto
{
    [JsonPropertyName("pancelID")]
    public string? PancelId { get; set; }
    
    [JsonPropertyName("pajzsID")]
    public string? PajzsId { get; set; }
    
    [JsonPropertyName("fegyverIDk")]
    public IList<string> FegyverIds { get; set; }
}