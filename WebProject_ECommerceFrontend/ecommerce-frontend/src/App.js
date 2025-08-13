import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './pages/productList';     
import ProductDetail from './pages/productDetail';
import Header from './components/header';  
import HomePage from './pages/home'; 
import Signup from './pages/signup';
import Login from './pages/login';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import ProtectedRoute from './protectedRoute'; // Import the ProtectedRoute component
import Profile from './pages/profile'; // Import Profile component
import Footer from './components/footer';


function App() {
  return (
    <div>
      <Header />  {/* Include Header component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile/>} />
        {/* Protected checkout route */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer /> {/* Include Footer component */}
    </div>
  );
}

export default App;
