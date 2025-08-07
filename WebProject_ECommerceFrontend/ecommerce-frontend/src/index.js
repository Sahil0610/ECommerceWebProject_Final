import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./cartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>      {/* Wrap App inside BrowserRouter */}
      <AuthProvider> {/* Assuming you have an AuthProvider for context */} 
        <CartProvider> {/* Add this */}
          <App />
        </CartProvider>
      </AuthProvider> {/* Include AuthProvider to provide auth context */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
