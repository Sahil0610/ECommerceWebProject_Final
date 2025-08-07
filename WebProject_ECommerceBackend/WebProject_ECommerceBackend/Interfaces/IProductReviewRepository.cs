using WebProject_ECommerceBackend.Entities;

namespace WebProject_ECommerceBackend.Interfaces
{
    public interface IProductReviewRepository
    {
        Task AddReviewAsync(ProductReview review);
        Task<IEnumerable<ProductReview>> GetReviewsByProductIdAsync(int productId);
        Task SaveChangesAsync();
    }
}
