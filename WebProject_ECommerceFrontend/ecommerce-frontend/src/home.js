// src/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Welcome to <span className="text-yellow-500">FURNI.</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Modern, Comfortable, and Affordable Furniture for Your Home
          </p>
          <Link to="/products">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-lg shadow-lg transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1616627982473-6e9b78963294?auto=format&fit=crop&w=900&q=80"
            alt="Furniture Hero"
            className="rounded-xl shadow-xl w-full max-h-[500px] object-cover"
          />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {[
            {
              name: "Lounge Chairs",
              image:
                "https://images.unsplash.com/photo-1578898887565-afa162a1569a?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Dining Sets",
              image:
                "https://images.unsplash.com/photo-1582582425174-989c87b50d70?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Bedroom Comfort",
              image:
                "https://images.unsplash.com/photo-1595526114035-9e9a1f5293a9?auto=format&fit=crop&w=800&q=80",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to="/products"
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover group-hover:scale-110 transform transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-3xl font-semibold drop-shadow-lg">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-20 px-6 max-w-6xl mx-auto text-center rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-14 text-gray-900">Why Choose FURNI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
          {[
            {
              icon: "https://img.icons8.com/dusk/64/000000/quality.png",
              title: "Premium Quality",
              desc: "Our furniture is crafted with the finest materials for durability.",
            },
            {
              icon: "https://img.icons8.com/dusk/64/000000/delivery.png",
              title: "Fast Delivery",
              desc: "Quick and reliable shipping right to your doorstep.",
            },
            {
              icon: "https://img.icons8.com/dusk/64/000000/customer-support.png",
              title: "Excellent Support",
              desc: "Friendly and efficient customer service to assist you.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              <img src={item.icon} alt={item.title} className="mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Width Promo Banner */}
      <section
        className="relative bg-cover bg-center h-72 my-20 rounded-xl max-w-7xl mx-auto"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-60 h-full flex items-center justify-center rounded-xl">
          <h2 className="text-white text-5xl font-extrabold drop-shadow-lg px-4 text-center max-w-4xl">
            Upgrade Your Living Space Today
          </h2>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
