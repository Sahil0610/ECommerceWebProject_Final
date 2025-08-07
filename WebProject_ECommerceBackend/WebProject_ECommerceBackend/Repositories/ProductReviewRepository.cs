using System;
using Microsoft.EntityFrameworkCore;
using WebProject_ECommerceBackend.Data;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Interfaces;

namespace WebProject_ECommerceBackend.Repositories
{
    public class ProductReviewRepository : IProductReviewRepository
    {
        private readonly ECommerceDbContext _context;

        public ProductReviewRepository(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task AddReviewAsync(ProductReview review)
        {
            await _context.ProductReviews.AddAsync(review);
        }

        public async Task<IEnumerable<ProductReview>> GetReviewsByProductIdAsync(int productId)
        {
            return await _context.ProductReviews
                                 .Where(r => r.ProductId == productId)
                                 .OrderByDescending(r => r.PostedAt)
                                 .ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
