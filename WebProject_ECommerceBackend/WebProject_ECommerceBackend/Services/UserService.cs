using System.Security.Cryptography;
using System.Text;
using WebProject_ECommerceBackend.DTOs;
using WebProject_ECommerceBackend.Entities;
using WebProject_ECommerceBackend.Interfaces;

namespace WebProject_ECommerceBackend.Services
{
    public class UserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo) => _repo = repo;

        public async Task<string> Register(UserRegisterDto dto)
        {
            if (await _repo.GetByEmailAsync(dto.Email) != null)
                return "Email already exists.";

            CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            await _repo.AddUserAsync(user);
            await _repo.SaveChangesAsync();

            return "User registered successfully.";
        }

        public async Task<(bool Success, string Message, string? FullName)> Login(UserLoginDto dto)
        {
            var user = await _repo.GetByEmailAsync(dto.Email);
            if (user == null || !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
                return (false, "Invalid email or password.", null);

            return (true, "Login successful.", user.FullName);
        }

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using var hmac = new HMACSHA512(salt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(hash);
        }
    }
}
