namespace WebProject_ECommerceBackend.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public decimal productPrice { get; set; }
        public string productImageUrl { get; set; }
    }
}
