namespace WebProject_ECommerceBackend.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductImageUrl { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Total => ProductPrice * Quantity;
    }

    public class AddCartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
        public int? UserId { get; set; }  // null if guest
        public string? SessionId { get; set; }
    }

    public class UpdateCartItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
    }
}
