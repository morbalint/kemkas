using System.Text.Json.Serialization;

namespace Kemkas.Web.ViewModels;

/// <summary>
/// currently the same for 1st edition and 2nd edition, be cautious!
/// </summary>
public struct KarakterTulajdonsagokDto
{
    [JsonPropertyName("t_ero")]
    public byte Ero { get; set; }
    [JsonPropertyName("t_ugy")]
    public byte Ugy { get; set; }
    [JsonPropertyName("t_egs")]
    public byte Egs { get; set; }
    [JsonPropertyName("t_int")]
    public byte Int { get; set; }
    [JsonPropertyName("t_bol")]
    public byte Bol { get; set; }
    [JsonPropertyName("t_kar")]
    public byte Kar { get; set; }
}