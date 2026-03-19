using ShareBreak.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddScoped<ProfileSettingsService>();
builder.Services.AddScoped<PrivacyService>();
builder.Services.AddControllers();

// Add CORS if needed
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure middleware
app.UseCors("AllowAll");
app.MapControllers();

app.MapGet("/", () => "ShareBreak API - Profile Settings Service");

await app.RunAsync();
