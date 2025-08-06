import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Your Shopping Cart</h2>
      <p>Your cart is currently empty.</p>
      <button 
        onClick={handleCheckout} 
        style={{ marginTop: 20, padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
