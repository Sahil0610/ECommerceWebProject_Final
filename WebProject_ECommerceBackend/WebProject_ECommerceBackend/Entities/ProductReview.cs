using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebProject_ECommerceBackend.Models;

namespace WebProject_ECommerceBackend.Entities
{
    public class ProductReview
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; } // Matches Product table PK

        [Required]
        [MaxLength(100)]
        public string ReviewerName { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(1000)]
        public string ReviewText { get; set; }

        public string? ImageUrl { get; set; } // Path to uploaded image

        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
    }
}
