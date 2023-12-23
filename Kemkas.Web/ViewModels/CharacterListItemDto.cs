using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

public struct CharacterListItemDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("szint")]
    public byte Szint { get; set; }
    
    [JsonPropertyName("faj")]
    public string Faj { get; set; }
    
    [JsonPropertyName("osztaly")]
    public string Osztaly { get; set; }
}