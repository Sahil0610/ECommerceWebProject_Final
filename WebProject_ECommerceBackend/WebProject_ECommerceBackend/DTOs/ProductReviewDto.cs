namespace WebProject_ECommerceBackend.DTOs
{
    public class ProductReviewDto
    {
        public int ProductId { get; set; }
        public string ReviewerName { get; set; }
        public int Rating { get; set; }
        public string ReviewText { get; set; }
        public IFormFile? Image { get; set; } // Uploaded filel
    }
}
