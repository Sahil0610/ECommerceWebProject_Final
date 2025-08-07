using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebProject_ECommerceBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedItem10Products : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "productDescription", "productImageUrl", "productName", "productPrice" },
                values: new object[,]
                {
                    { 1, "High-back ergonomic chair with mesh design and lumbar support.", "/Assets/Images/1.png", "ErgoMesh Office Chair", 159.99m },
                    { 2, "Stylish mid-century modern armchair with walnut finish and grey upholstery.", "/Assets/Images/2.png", "Walnut Accent Armchair", 219.99m },
                    { 3, "Plush recliner with adjustable back and footrest for living rooms.", "/Assets/Images/3.png", "Reclining Lounge Chair", 299.99m },
                    { 4, "Set of 4 modern dining chairs with cushioned seats and wooden legs.", "/Assets/Images/4.png", "Dining Chair Set (4 pcs)", 249.99m },
                    { 5, "Traditional wooden rocking chair ideal for nurseries and porches.", "/Assets/Images/6.png", "Rocking Chair Classic", 179.99m },
                    { 6, "Comfortable vintage leather chair with wooden legs.", "/Assets/Images/7.png", "Vintage Leather Club Chair", 189.49m },
                    { 7, "Compact ergonomic chair with swivel base, perfect for home offices.", "/Assets/Images/8.png", "Compact Swivel Task Chair", 129.99m },
                    { 8, "Hand-woven rattan chair with natural finish and cozy seat cushion.", "/Assets/Images/9.png", "Boho Rattan Accent Chair", 204.75m },
                    { 9, "Premium executive office chair with adjustable height and padded armrests.", "/Assets/Images/10.png", "High-Back Executive Chair", 249.00m },
                    { 10, "Sleek wooden chair with clean lines and a modern minimalist design.", "/Assets/Images/11.png", "Minimalist Wooden Chair", 144.25m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
