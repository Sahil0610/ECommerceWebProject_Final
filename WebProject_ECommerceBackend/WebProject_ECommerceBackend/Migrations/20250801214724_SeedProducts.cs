using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebProject_ECommerceBackend.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
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
                    { 5, "Traditional wooden rocking chair ideal for nurseries and porches.", "/Assets/Images/6.png", "Rocking Chair Classic", 179.99m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 5);
        }
    }
}
