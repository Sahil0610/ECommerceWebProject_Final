using Microsoft.AspNetCore.Mvc;
using WebProject_ECommerceBackend.DTOs;
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
                userName = result.FullName
                // you can also send JWT token here if needed
            });
        }
    }
}
