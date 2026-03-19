using System.ComponentModel.DataAnnotations;
using System.Globalization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Util;
using static System.DateTime;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController(MyDbContext ctx, IConfiguration config, JwtService jwt) : ControllerBase
{
    [HttpPost(nameof(Login))]
    [Produces<LoginResponseDto>]
    public async Task<LoginResponseDto> Login([FromBody] LoginRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            throw new ValidationException("E-mail and password are required.");

        var pepper = config["SECRET"]?.Substring(0, 16);
        var user = await ctx.Users.FirstOrDefaultAsync(u => u.Email == request.Email && !u.IsDeleted);
        if (user == null || !GenerateHashPass.Verify(request.Password, user.Password, pepper))
            throw new ValidationException("Username or password is incorrect");
        return ConvertUserToLoginResponse(user);
    }

    [HttpPost(nameof(Register))]
    [Produces<LoginResponseDto>]
    public async Task<LoginResponseDto> Register([FromBody] RegisterRequestDto request)
    {
        var ValidatedBirthday = DateTime.UtcNow;
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            throw new ValidationException("E-mail and password are required.");
        }

        if (request.Birthday != null)
        {
            try
            {
                ValidatedBirthday = DateTime.Parse(request.Birthday, CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                throw new ValidationException("Invalid birthday.");
            }
        }

        var userToRegister = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = GenerateHashPass.Generate(request.Password),
            Birthday = request.Birthday == null
                ? ValidatedBirthday.ToString(CultureInfo.InvariantCulture)
                : string.Empty,
            IsDeleted = false
        };
        ctx.Users.Add(userToRegister);
        await ctx.SaveChangesAsync();
        return ConvertUserToLoginResponse(userToRegister);
    }


    private LoginResponseDto ConvertUserToLoginResponse(User user)
    {
        var token = jwt.GenerateToken(user.Id.ToString(), user.Email, user.Name);
        return new LoginResponseDto
        {
            Token = token,
            Expiration = UtcNow.AddHours(24),
            Email = user.Email,
            UserName = user.Name
        };
    }

    public class LoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequestDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Birthday { get; set; }
    }

    public class LoginResponseDto
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}