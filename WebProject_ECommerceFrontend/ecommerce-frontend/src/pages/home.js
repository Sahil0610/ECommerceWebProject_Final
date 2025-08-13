// src/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import homePage from '../assets/couch.png';
import product1 from '../assets/product-1.png';
import product2 from '../assets/product-2.png';
import product3 from '../assets/product-3.png';
import { FaPlusCircle} from "react-icons/fa";

// HomePage Component
// This component renders the home page of the e-commerce site
function HomePage() {
  const featuredItems = [
    {
      name: "Lounge Chairs",
      image: product1,
    },
    {
      name: "Dining Sets",
      image: product2,
    },
    {
      name: "Bedroom Comfort",
      image: product3,
    },
  ];

  // Reasons to choose FURNI
  const reasons = [
    {
      icon: "https://img.icons8.com/dusk/64/000000/customer-support.png",
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
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Discover <span className="text-yellow-500">FURNI</span> — Modern Elegance.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Premium furniture solutions to transform your home.
          </p>
          <Link to="/products">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-lg shadow-lg transition duration-300">
              Explore Collection
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={homePage}
            alt="Modern Living Room"
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Column 1: Text Content */}
          <div className="col-span-1">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Crafted with excellent material.</h2>
            <p className="text-gray-600 mb-6">
              Furni brings style and comfort to your home. Explore our curated collection of modern furniture and home essentials designed to enhance every living space.
            </p>
            <Link to="/products">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow transition duration-300">
                Explore
              </button>
            </Link>
          </div>

          {/* Column 2–4: Product Cards */}
          {featuredItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
              <Link to="/products" className="block relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <strong className="text-yellow-500 text-lg">$50.00</strong>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-20 px-6 max-w-6xl mx-auto text-center rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-14 text-gray-900">Why Choose FURNI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
          {reasons.map((item, index) => (
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
