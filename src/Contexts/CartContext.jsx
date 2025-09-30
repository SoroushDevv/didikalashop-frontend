import { createContext, useContext } from 'react';
import useLocalStorage from './../Hooks/useLocalStorage';

// ایجاد Context
const CartContext = createContext();

// Provider برای CartContext
export const CartProvider = ({ children }) => {

  const [orders, setLocalValue, { loading, error, trigger }] = useLocalStorage('orders', []);

 const setOrders = setLocalValue
 
  return (
    <CartContext.Provider value={{ orders, setOrders, loading, error, triggerUpdate: trigger }}>
      {children}
    </CartContext.Provider>
  );
};

// هوک برای دسترسی به Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};