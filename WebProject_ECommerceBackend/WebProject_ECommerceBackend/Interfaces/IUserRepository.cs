using WebProject_ECommerceBackend.Entities;

namespace WebProject_ECommerceBackend.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task SaveChangesAsync();
    }
}
