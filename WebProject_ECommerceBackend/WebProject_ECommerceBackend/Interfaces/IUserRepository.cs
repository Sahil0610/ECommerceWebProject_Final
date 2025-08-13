using WebProject_ECommerceBackend.Entities;

namespace WebProject_ECommerceBackend.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
        
        Task AddUserAsync(User user);
        Task SaveChangesAsync();

        void UpdateUser(User user);

        //Task<User?> GetByGoogleIdAsync(string googleId);
    }
}
