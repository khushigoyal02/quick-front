import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
    else {
      alert('Please log in to access the cart.');
      navigate('/login');
    }
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`api/v1/cart-items/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/api/v1/cart-items/${userId}/${productId}`);
      const {message} = response.data;
      alert(message);
      // You may update the UI to reflect the changes
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <h1 className='empty'>Your cart is currently empty.</h1>
      ) : (
        <div>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className='cartList'>
              <img src={item.imageurl} alt={item.name} />
              <div>
              <h4>{item.name}</h4>
              <span>Price: ₹{item.price}</span> <br/>
              <span>Quantity: {item.quantity}</span> <br/>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        {/*<button className='order'>Place Order</button>*/}
        </div>
      )}
    </div>
  );
};

export default Cart;