import { createContext, useContext } from 'react';
import useLocalStorage from './../Hooks/useLocalStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [order, setLocalValue, { loading, error, trigger }] = useLocalStorage('order', null);

  const setOrder = setLocalValue;

  return (
    <CartContext.Provider value={{ order, setOrder, loading, error, triggerUpdate: trigger }}>
      {children}
    </CartContext.Provider>
  );
 console.log("orders :" , order)

};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
 
  return context;
};
