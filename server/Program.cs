using System.Text;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.CSharp.RuntimeBinder;
using server;
using server.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;
using server.Util;
using WindMill;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(ConfigurationHelper.ConfigureEnvironment(builder));
Env.TraversePath().Load();
var connectionString = Environment.GetEnvironmentVariable("DEV_DB_CONNECTION");
var secret = Environment.GetEnvironmentVariable("SECRET");
if (secret == null)
{
	throw new RuntimeBinderException("SECRET was not found.");
	
}

if (string.IsNullOrWhiteSpace(connectionString))
{
	throw new RuntimeBinderException("DEV_DB_CONNECTION was not found.");
}

builder.Services.AddDbContext<MyDbContext>(options =>
	options.UseNpgsql(connectionString));
builder.Services.AddCors(options => options.AddPolicy("AllowAll", policy =>
{
	policy.AllowAnyOrigin()
		.AllowAnyMethod()
		.AllowAnyHeader();
}));

builder.Services.AddOpenApiDocument(document =>
{
	document.Title = "ShareBreak API";
	document.Description = "Social app for meeting people outdoors and building connections.";
	document.Version = "v1";
	document.AddSecurity("Bearer", new OpenApiSecurityScheme
	{
		Type = OpenApiSecuritySchemeType.ApiKey,
		Scheme = "bearer",
		BearerFormat = "JWT",
		Name = "Authorization",
		In = OpenApiSecurityApiKeyLocation.Header,
		Description = "JWT Authorization header using the Bearer scheme."
	});
	document.OperationProcessors.Add(item: new AspNetCoreOperationSecurityScopeProcessor(name: "JWT"));
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = false,
		ValidateAudience = false,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
	});
builder.Services.AddAuthorization();
builder.Services.AddScoped<DataSeeder>();

// Register services
builder.Services.AddScoped<ProfileSettingsService>();
builder.Services.AddScoped<PrivacyService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<FriendService>();
builder.Services.AddScoped<ChallengeService>();

// Add controllers
builder.Services.AddControllers();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
	var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
	await dataSeeder.Initialize();
}

app.UseOpenApi();
app.UseSwaggerUi();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
if (builder.Environment.IsDevelopment())
{
	app.GenerateApiClientsFromOpenApi("../client/src/generated-ts-client.ts", "./openapi.json").GetAwaiter()
		.GetResult();
}

await app.RunAsync();
