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

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

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

        public async Task<(bool Success, string Message, string? FullName, int? Id)> Login(UserLoginDto dto)
        {
            var user = await _repo.GetByEmailAsync(dto.Email);
            if (user == null || !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
                return (false, "Invalid email or password.", null, null);

           // var token = _jwtService.GenerateToken(user);

            return (true, "Login successful.", user.FullName, user.Id);
        }

        // existing methods...
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

        public async Task<UserProfileDto?> GetUserProfile(int userId)
        {
            var user = await _repo.GetByIdAsync(userId);
            if (user == null) return null;

            return new UserProfileDto
            {
                FullName = user.FullName,
                AddressLine1 = user.AddressLine1,
                AddressLine2 = user.AddressLine2,
                City = user.City,
                State = user.State,
                PostalCode = user.PostalCode,
                Country = user.Country
            };
        }

        public async Task<string> UpdateUserProfile(int userId, UserProfileDto dto)
        {
            var user = await _repo.GetByIdAsync(userId);
            if (user == null) return "User not found.";

            user.FullName = dto.FullName;
            user.AddressLine1 = dto.AddressLine1;
            user.AddressLine2 = dto.AddressLine2;
            user.City = dto.City;
            user.State = dto.State;
            user.PostalCode = dto.PostalCode;
            user.Country = dto.Country;

            _repo.UpdateUser(user);
            await _repo.SaveChangesAsync();

            return "Profile updated successfully.";
        }

        public async Task<string> ChangePassword(ChangePasswordDto dto)
        {
            var user = await _repo.GetByIdAsync(dto.UserId);
            if (user == null) return "User not found.";

            if (!VerifyPasswordHash(dto.OldPassword, user.PasswordHash, user.PasswordSalt))
                return "Old password is incorrect.";

            CreatePasswordHash(dto.NewPassword, out byte[] newHash, out byte[] newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;

            _repo.UpdateUser(user);
            await _repo.SaveChangesAsync();

            return "Password changed successfully.";
        }
    }
}
