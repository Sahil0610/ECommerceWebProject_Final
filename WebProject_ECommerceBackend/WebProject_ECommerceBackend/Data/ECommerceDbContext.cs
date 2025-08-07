using Microsoft.EntityFrameworkCore;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Models;

namespace WebProject_ECommerceBackend.Data
{
    public class ECommerceDbContext : DbContext
    {
        public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
            new Product
            {
                ProductId = 1,
                productName = "ErgoMesh Office Chair",
                productDescription = "High-back ergonomic chair with mesh design and lumbar support.",
                productPrice = 159.99M,
                productImageUrl = "/Assets/Images/1.png"
            },
            new Product
            {
                ProductId = 2,
                productName = "Walnut Accent Armchair",
                productDescription = "Stylish mid-century modern armchair with walnut finish and grey upholstery.",
                productPrice = 219.99M,
                productImageUrl = "/Assets/Images/2.png"
            },
            new Product
            {
                ProductId = 3,
                productName = "Reclining Lounge Chair",
                productDescription = "Plush recliner with adjustable back and footrest for living rooms.",
                productPrice = 299.99M,
                productImageUrl = "/Assets/Images/3.png"
            },
            new Product
            {
                ProductId = 4,
                productName = "Dining Chair Set (4 pcs)",
                productDescription = "Set of 4 modern dining chairs with cushioned seats and wooden legs.",
                productPrice = 249.99M,
                productImageUrl = "/Assets/Images/4.png"
            },
            new Product
            {
                ProductId = 5,
                productName = "Rocking Chair Classic",
                productDescription = "Traditional wooden rocking chair ideal for nurseries and porches.",
                productPrice = 179.99M,
                productImageUrl = "/Assets/Images/6.png"
            },
            new Product
            {
                ProductId = 6,
                productName = "Vintage Leather Club Chair",
                productDescription = "Comfortable vintage leather chair with wooden legs.",
                productPrice = 189.49M,
                productImageUrl = "/Assets/Images/7.png"
            },
            new Product
            {
                ProductId = 7,
                productName = "Compact Swivel Task Chair",
                productDescription = "Compact ergonomic chair with swivel base, perfect for home offices.",
                productPrice = 129.99M,
                productImageUrl = "/Assets/Images/8.png"
            },
            new Product
            {
                ProductId = 8,
                productName = "Boho Rattan Accent Chair",
                productDescription = "Hand-woven rattan chair with natural finish and cozy seat cushion.",
                productPrice = 204.75M,
                productImageUrl = "/Assets/Images/9.png"
            },
            new Product
            {
                ProductId = 9,
                productName = "High-Back Executive Chair",
                productDescription = "Premium executive office chair with adjustable height and padded armrests.",
                productPrice = 249.00M,
                productImageUrl = "/Assets/Images/10.png"
            },
            new Product
            {
                ProductId = 10,
                productName = "Minimalist Wooden Chair",
                productDescription = "Sleek wooden chair with clean lines and a modern minimalist design.",
                productPrice = 144.25M,
                productImageUrl = "/Assets/Images/11.png"
            }
            );
        }
    }
}
