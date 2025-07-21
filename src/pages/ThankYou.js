    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
  

    const ThankYou = () => {
      const CartContext = React.createContext();
      const [cartItems, setCartItems] = useState([]);

      const navigate = useNavigate();

    const clearCart = () => {
      navigate('/'); // Redirect to home or order confirmation page
      setCartItems([]); // Clear the cart items
      alert('Thank you for your order! Your cart has been cleared.');
    };

      return (
        <CartContext.Provider value={{ cartItems, clearCart }}>
            <div>
            <h1>Checkout Successful!</h1>
            <p>Your order has been placed.</p>
            </div>
           
        </CartContext.Provider>
       
      );
    };
    export default ThankYou;