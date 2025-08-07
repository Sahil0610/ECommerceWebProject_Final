using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProject_ECommerceBackend.Data;
using WebProject_ECommerceBackend.DTOs;
using WebProject_ECommerceBackend.Entities;

namespace WebProject_ECommerceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ECommerceDbContext _context;

        public CartController(ECommerceDbContext context)
        {
            _context = context;
        }

        // POST: api/Cart/Add
        [HttpPost]
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddCartItemDto dto)
        {
            Console.WriteLine($"DEBUG: Received UserId = {dto.UserId}, SessionId = {dto.SessionId}");

            if (dto.UserId == null && string.IsNullOrEmpty(dto.SessionId))
                return BadRequest("Either UserId or SessionId must be provided.");

            var existing = await _context.CartItems.FirstOrDefaultAsync(c =>
                c.ProductId == dto.ProductId &&
                ((dto.UserId != null && c.UserId == dto.UserId) ||
                 (!string.IsNullOrEmpty(dto.SessionId) && c.SessionId == dto.SessionId)));

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
            }
            else
            {
                var product = await _context.Products
                    .FirstOrDefaultAsync(p => p.ProductId == dto.ProductId);

                if (product == null)
                    return NotFound("Product not found.");

                var item = new CartItem
                {
                    ProductId = product.ProductId,
                    ProductName = product.productName,
                    ProductPrice = product.productPrice,
                    ProductImageUrl = product.productImageUrl,
                    Quantity = dto.Quantity,
                    UserId = dto.UserId,      
                    SessionId = dto.SessionId        
                };

                _context.CartItems.Add(item);
            }

            await _context.SaveChangesAsync();
            return Ok("Item added to cart.");
        }


        // GET: api/Cart?userId=1 or ?sessionId=abc123
        [HttpGet]
        public async Task<IActionResult> GetCartItems([FromQuery] int? userId, [FromQuery] string? sessionId)
        {
            if (userId == null && string.IsNullOrEmpty(sessionId))
                return BadRequest("UserId or SessionId must be provided.");

            var query = from cartItem in _context.CartItems
                        join product in _context.Products
                        on cartItem.ProductId equals product.ProductId
                        where (userId != null && cartItem.UserId == userId) ||
                              (!string.IsNullOrEmpty(sessionId) && cartItem.SessionId == sessionId)
                        select new CartItemDto
                        {
                            Id = cartItem.Id,
                            ProductId = product.ProductId,
                            ProductName = product.productName,
                            ProductDescription = product.productDescription,
                            ProductPrice = product.productPrice,
                            ProductImageUrl = product.productImageUrl ?? "",
                            Quantity = cartItem.Quantity
                        };

            var cartItemDtos = await query.ToListAsync();

            return Ok(cartItemDtos);
        }

        // PUT: api/Cart/Update
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartItemDto dto)
        {
            var item = await _context.CartItems.FindAsync(dto.Id);
            if (item == null)
                return NotFound("Cart item not found.");

            item.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();

            return Ok("Cart item updated.");
        }

        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCartItem(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Item removed.");
        }

        // DELETE: api/Cart/Clear?userId=1 or ?sessionId=abc123
        [HttpDelete("Clear")]
        public async Task<IActionResult> ClearCart([FromQuery] int? userId, [FromQuery] string? sessionId)
        {
            if (userId == null && string.IsNullOrEmpty(sessionId))
                return BadRequest("UserId or SessionId must be provided.");

            var items = await _context.CartItems
                .Where(c =>
                    (userId != null && c.UserId == userId) ||
                    (!string.IsNullOrEmpty(sessionId) && c.SessionId == sessionId))
                .ToListAsync();

            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok("Cart cleared.");
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetCartItemCount([FromQuery] int? userId, [FromQuery] string? sessionId)
        {
            if (userId == null && string.IsNullOrEmpty(sessionId))
            {
                return BadRequest("Either userId or sessionId must be provided.");
            }

            int count = 0;

            if (userId != null)
            {
                count = await GetCartItemCountByUserIdAsync(userId.Value);
            }
            else if (!string.IsNullOrEmpty(sessionId))
            {
                count = await GetCartItemCountBySessionIdAsync(sessionId);
            }

            return Ok(new { count });
        }

        private async Task<int> GetCartItemCountByUserIdAsync(int userId)
        {
            return await _context.CartItems.CountAsync(c => c.UserId == userId);
        }

        private async Task<int> GetCartItemCountBySessionIdAsync(string sessionId)
        {
            return await _context.CartItems.CountAsync(c => c.SessionId == sessionId);
        }

        [HttpPost("merge")]
        public async Task<IActionResult> MergeGuestCart([FromBody] MergeCartDto dto)
        {
            var guestItems = await _context.CartItems
                .Where(ci => ci.SessionId == dto.SessionId && ci.UserId == null)
                .ToListAsync();

            var userItems = await _context.CartItems
                .Where(ci => ci.UserId == dto.UserId)
                .ToListAsync();

            foreach (var guestItem in guestItems)
            {
                var existingUserItem = userItems.FirstOrDefault(ui => ui.ProductId == guestItem.ProductId);
                if (existingUserItem != null)
                {
                    existingUserItem.Quantity += guestItem.Quantity;
                }
                else
                {
                    guestItem.UserId = dto.UserId;
                    guestItem.SessionId = null;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { count = userItems.Sum(i => i.Quantity) });
        }

    }
}
