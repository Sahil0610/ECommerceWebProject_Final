using Microsoft.AspNetCore.Mvc;
using WebProject_ECommerceBackend.DTOs;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Services;

namespace WebProject_ECommerceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;
        public UserController(UserService service) => _service = service;

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var result = await _service.Register(dto);
            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var result = await _service.Login(dto);

            if (!result.Success)
                return Unauthorized(new { message = result.Message });

            return Ok(new
            {
                message = result.Message,
                userName = result.FullName,
                userId = result.Id,
                // token can be added if your service returns it
            });
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfileDto>> GetProfile(int userId)
        {
            var profile = await _service.GetUserProfile(userId);
            if (profile == null) return NotFound();
            return profile;
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, [FromBody] UserProfileDto dto)
        {
            var result = await _service.UpdateUserProfile(userId, dto);
            if (result == "User not found.") return NotFound(result);
            return Ok(result);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var result = await _service.ChangePassword(dto);
            if (result.Contains("incorrect") || result.Contains("not found"))
                return BadRequest(result);
            return Ok(result);
        }
    }
}
