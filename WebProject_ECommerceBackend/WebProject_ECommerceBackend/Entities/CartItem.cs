using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebProject_ECommerceBackend.Models;

namespace WebProject_ECommerceBackend.Entities
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        public decimal ProductPrice { get; set; }

        public string? ProductImageUrl { get; set; }

        [Required]
        public int Quantity { get; set; }

        public string? SessionId { get; set; } // For guest users

        public int? UserId { get; set; } // For logged-in users

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
