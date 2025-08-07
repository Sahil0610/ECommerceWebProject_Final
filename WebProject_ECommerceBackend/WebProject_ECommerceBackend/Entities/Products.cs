using System.ComponentModel.DataAnnotations;

namespace WebProject_ECommerceBackend.Entities
{
    public class Products
    {
        [Key]
        public int ProductId { get; set; }

        public string productName { get; set; } = string.Empty;

        public string? productDescription { get; set; }

        public decimal productPrice { get; set; }

        public string? productImageUrl { get; set; }
    }
}
