namespace Kemkas.Web.Config;

public class MailgunOptions
{
    public const string Section = "Email";

    public string ApiKey { get; set; }
    
    public string DomainName { get; set; }
}