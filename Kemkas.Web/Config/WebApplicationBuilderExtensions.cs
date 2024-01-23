using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace Kemkas.Web.Config;

public static class WebApplicationBuilderExtensions
{
    public static void AddAuth(this WebApplicationBuilder builder)
    {
        var externalAuthConfigSection = builder.Configuration.GetSection("Authentication");
        var authenticationBuilder = builder.Services.AddAuthentication();

        var googleAuthOptions = new ExternalAuthOptions();
        externalAuthConfigSection.GetSection("Google").Bind(googleAuthOptions);
        if (googleAuthOptions.IsValid())
        {
            authenticationBuilder.AddGoogle(options =>
            {
                options.ClientId = googleAuthOptions.ClientId!;
                options.ClientSecret = googleAuthOptions.ClientSecret!;
            });
        }

        var facebookAuthOptions = new ExternalAuthOptions();
        externalAuthConfigSection.GetSection("Facebook").Bind(facebookAuthOptions);
        if (facebookAuthOptions.IsValid())
        {
            authenticationBuilder.AddFacebook(options =>
            {
                options.ClientId = facebookAuthOptions.ClientId!;
                options.ClientSecret = facebookAuthOptions.ClientSecret!;
            });
        }

        var discordAuthOptions = new ExternalAuthOptions();
        externalAuthConfigSection.GetSection("Discord").Bind(discordAuthOptions);
        if (discordAuthOptions.IsValid())
        {
            authenticationBuilder.AddDiscord(options =>
            {
                options.ClientId = discordAuthOptions.ClientId!;
                options.ClientSecret = discordAuthOptions.ClientSecret!;
            });
        }
    }
    
    public static void AddOpenTelemetry(this WebApplicationBuilder builder)
    {
        var otlResourceBuilder = ResourceBuilder.CreateDefault().AddService("kemkas-api");
        var openTelemetryEndpoint = builder.Configuration.GetSection("monitoring")["url"];

        builder.Services.AddOpenTelemetry().WithTracing(tracerProviderBuilder =>
            {
                tracerProviderBuilder
                    .SetResourceBuilder(otlResourceBuilder)
                    .AddAspNetCoreInstrumentation();
                if (openTelemetryEndpoint != null)
                {
                    tracerProviderBuilder.AddOtlpExporter(opt => opt.Endpoint = new Uri(openTelemetryEndpoint));
                }
                else
                {
                    tracerProviderBuilder.AddConsoleExporter();
                }
                    
            })
            .WithMetrics(meterProviderBuilder =>
            {
                meterProviderBuilder
                    .SetResourceBuilder(otlResourceBuilder)
                    .AddAspNetCoreInstrumentation();
                if (openTelemetryEndpoint != null)
                {
                    meterProviderBuilder.AddOtlpExporter(opt => opt.Endpoint = new Uri(openTelemetryEndpoint));
                }
                else
                {
                    meterProviderBuilder.AddConsoleExporter();
                }
            });
    }

}