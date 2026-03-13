using Fracto.API.Data;
using Fracto.API.DTOs;
using Fracto.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fracto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid data");

            if (string.IsNullOrWhiteSpace(dto.Name) ||
                string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
            {
                return BadRequest("All fields are required");
            }

            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email.ToLower() == dto.Email.ToLower());

            if (existingUser != null)
            {
                return BadRequest("Email already registered");
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Role = "Patient"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                message = "User registered successfully"
            });
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (login == null ||
                string.IsNullOrWhiteSpace(login.Email) ||
                string.IsNullOrWhiteSpace(login.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Email and password are required"
                });
            }

            var user = _context.Users
                .FirstOrDefault(x => x.Email == login.Email && x.Password == login.Password);

            if (user == null)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid email or password"
                });
            }

            return Ok(new LoginResponseDto
            {
                Success = true,
                Message = "Login success",
                User = new UserDto
                {
                    Id = user.UserId,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            });
        }
    }
}
