using DotNetEnv;
using server;
using server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
Env.TraversePath().Load();
var connectionString = Environment.GetEnvironmentVariable("DEV_DB_CONNECTION");

if (string.IsNullOrWhiteSpace(connectionString))
{
	throw new Exception("DEV_DB_CONNECTION was not found.");
}

builder.Services.AddDbContext<MyDbContext>(options =>
	options.UseNpgsql(connectionString));

// Register services
builder.Services.AddScoped<ProfileSettingsService>();
builder.Services.AddScoped<PrivacyService>();

// Add controllers
builder.Services.AddControllers();

var app = builder.Build();

// Map controllers
app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.Run();