using System.Net;
using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Text.Unicode;
using Kemkas.Web.Config;
using Microsoft.EntityFrameworkCore;
using Kemkas.Web.Db;
using Kemkas.Web.Db.Models;
using Kemkas.Web.Services.Character;
using Kemkas.Web.Services.Identity;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity.UI.Services;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using IPNetwork = Microsoft.AspNetCore.HttpOverrides.IPNetwork;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.Configure<MailgunOptions>(builder.Configuration.GetSection(MailgunOptions.Section));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
        options.UseNpgsql(connectionString));

builder.Services.AddDataProtection()
    .SetApplicationName("kemkas")
    .PersistKeysToDbContext<ApplicationDbContext>();

builder.Services.AddHttpClient();
builder.Services.AddSingleton<IEmailSender, MailgunEmailSender>();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.AddAuth();

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
    options.JsonSerializerOptions.AllowTrailingCommas = true;
    options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
});
builder.Services.AddRazorPages();

builder.AddOpenTelemetry();

builder.Services.AddHealthChecks();

builder.Services.AddCharacterServices();

var app = builder.Build();
app.UsePathBase("/api");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedForHeaderName = "X-Forwarded-For",
        ForwardedHostHeaderName = "X-Forwarded-Host",
        ForwardedProtoHeaderName = "X-Forwarded-Proto",
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedHost | ForwardedHeaders.XForwardedProto,
        KnownNetworks = { new IPNetwork(new IPAddress([0,0,0,0]), 0) }
    });
    app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();
}
else
{
    // Force HTTPS because prod environment is behind unmanaged proxy.
    app.Use((context, next) =>
    {
        context.Request.Scheme = "https";
        return next(context);
    });
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts(); // TODO: check if this should be handled by proxy
}

app.UseHealthChecks("/health");

await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await db.Database.MigrateAsync();
}

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "/{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
