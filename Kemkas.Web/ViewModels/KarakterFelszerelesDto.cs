using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

/// <summary>
/// currently the same for 1st edition and 2nd edition, be cautious!
/// </summary>
public struct KarakterFelszerelesDto
{
    [JsonPropertyName("pancelID")]
    public string? PancelId { get; set; }
    
    [JsonPropertyName("pajzsID")]
    public string? PajzsId { get; set; }
    
    [JsonPropertyName("fegyverIDk")]
    public IList<string> FegyverIds { get; set; }
}