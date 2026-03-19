using DotNetEnv;
using server;
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

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();