using System;
using WebProject_ECommerceBackend.Data;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WebProject_ECommerceBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ECommerceDbContext _context;
        public UserRepository(ECommerceDbContext context) => _context = context;

        public async Task<User?> GetByEmailAsync(string email) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task AddUserAsync(User user) => await _context.Users.AddAsync(user);

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
        }

       
    }
}
