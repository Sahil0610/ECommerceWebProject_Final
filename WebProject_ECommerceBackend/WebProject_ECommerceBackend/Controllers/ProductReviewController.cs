using Microsoft.AspNetCore.Mvc;
using WebProject_ECommerceBackend.DTOs;
using WebProject_ECommerceBackend.Services;

namespace WebProject_ECommerceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductReviewController : ControllerBase
    {
        private readonly ProductReviewService _service;

        public ProductReviewController(ProductReviewService service)
        {
            _service = service;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddReview([FromForm] ProductReviewDto dto)
        {
            var message = await _service.AddReviewAsync(dto);
            return Ok(new { message });
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetReviews(int productId)
        {
            var reviews = await _service.GetReviewsByProductIdAsync(productId);
            return Ok(reviews);
        }
    }
}
