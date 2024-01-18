using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

public struct CharacterListItemDto()
{
    [JsonPropertyName("id")]
    public required Guid Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("szint")]
    public required byte Szint { get; set; }

    [JsonPropertyName("faj")]
    public required string Faj { get; set; }

    [JsonPropertyName("osztaly")]
    public required string Osztaly { get; set; }

    [JsonPropertyName("edition")] 
    public required string Edition { get; set; }
}