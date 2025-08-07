using WebProject_ECommerceBackend.DTOs;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Interfaces;

namespace WebProject_ECommerceBackend.Services
{
    public class ProductReviewService
    {
        private readonly IProductReviewRepository _repo;

        public ProductReviewService(IProductReviewRepository repo)
        {
            _repo = repo;
        }

        public async Task<string> AddReviewAsync(ProductReviewDto dto)
        {
            string imageUrl = null;

            // Handle image upload if present
            if (dto.Image != null && dto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "review-images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                // Store relative path to be served via static files
                imageUrl = $"/review-images/{fileName}";
            }

            var review = new ProductReview
            {
                ProductId = dto.ProductId,
                ReviewerName = dto.ReviewerName,
                Rating = dto.Rating,
                ReviewText = dto.ReviewText,
                ImageUrl = imageUrl,
                PostedAt = DateTime.UtcNow
            };

            await _repo.AddReviewAsync(review);
            await _repo.SaveChangesAsync();

            return "Review added successfully!";
        }

        public async Task<IEnumerable<ProductReview>> GetReviewsByProductIdAsync(int productId)
        {
            return await _repo.GetReviewsByProductIdAsync(productId);
        }
    }
}
