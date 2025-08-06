import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './productList';     
import ProductDetail from './productDetail';
import Header from './header';  
import HomePage from './home'; 
import Signup from './signup';
import Login from './login';
import Cart from './cart';
import Checkout from './checkout';
import ProtectedRoute from './protectedRoute'; // Import the ProtectedRoute component


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
    </div>
  );
}

export default App;
