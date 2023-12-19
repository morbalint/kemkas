using System.Net.Http.Headers;
using Kemkas.Web.Config;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

namespace Kemkas.Web.Services.Identity;

public class MailgunEmailSender(IOptions<MailgunOptions> sendGridOptions, HttpClient httpClient) : IEmailSender
{
    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var domain = sendGridOptions.Value.DomainName;
        var uri = new Uri($"https://api.eu.mailgun.net/v3/{domain}/messages");
        var request = new HttpRequestMessage(HttpMethod.Post, uri);
        var authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"api:{sendGridOptions.Value.ApiKey}"));
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

        request.Content = new FormUrlEncodedContent(
        [
            new KeyValuePair<string,string>("from", $"no-reply@{domain}"),
            new KeyValuePair<string,string>("to", email),
            new KeyValuePair<string,string>("subject", subject),
            new KeyValuePair<string,string>("html", htmlMessage),
        ]);
        
        var response = await httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
    }
}