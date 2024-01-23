namespace Kemkas.Web.Config;

public class ExternalAuthOptions
{
    public string? ClientId { get; set; }
    
    public string? ClientSecret { get; set; }

    public bool IsValid() => ClientId != null && ClientSecret != null;
}