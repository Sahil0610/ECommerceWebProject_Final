using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WebProject_ECommerceBackend.Data;
using Microsoft.Extensions.FileProviders;
using System.IO;
using WebProject_ECommerceBackend.Services;
using WebProject_ECommerceBackend.Interfaces;
using WebProject_ECommerceBackend.Repositories;

namespace WebProject_ECommerceBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<ECommerceDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:3000")  // React dev server URL
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            // Repository
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            // If you have UserService class but no interface, register it as itself
            builder.Services.AddScoped<UserService>();

            var app = builder.Build();

            app.UseCors("AllowReactApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles(); // For wwwroot

            // Serve static files from "Assets" folder outside wwwroot
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(builder.Environment.ContentRootPath, "Assets")),
                RequestPath = "/Assets"
            });

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
