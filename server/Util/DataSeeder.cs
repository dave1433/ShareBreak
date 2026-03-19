using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Util;

public class DataSeeder(MyDbContext ctx, IConfiguration config)
{
    public async Task Initialize()
    {
        var logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger<DataSeeder>();

        // Adding default users
        logger.LogInformation("Starting default users seeding...");
        
        var usersList = await ctx.Users.ToListAsync();
        var existingUserEmails = usersList.Select(u => u.Email).ToHashSet();
        var pepper = config["SECRET"]?.Substring(0, 16);
        var adminBirthday = config["SUPER_USER_BIRTHDAY"] ?? "2000-01-01";

        var usersToAdd = new[]
        {
            new User
            {
                Name = config["SUPER_USER_NAME"] ?? "Admin",
                Email = config["SUPER_USER_EMAIL"] ?? config["SUPER_USER_EMAIL"] ?? "admin@dev.com",
                // Birthday is required by the current schema, so seeding always provides a value.
                Birthday = adminBirthday,
                Password = GenerateHashPass.Generate(config["SUPER_PASSWORD"] ?? "adminpass", pepper)
            }
        };

      ctx.Users.AddRange(usersToAdd.Where(user => !existingUserEmails.Contains(user.Email)));

        await ctx.SaveChangesAsync();
    }
}