import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const CartContext = createContext();

const defaultOrder = {
  orderId: null,
  userID: null,
  date: "",
  hour: "",
  isActive: false,
  items: [],
};

export const CartProvider = ({ children }) => {
  const [order, setLocalValue, { loading, error, trigger }] =
    useLocalStorage("order", defaultOrder);

  const [initialized, setInitialized] = useState(false);

  const setOrder = (newOrderPart) => {
    const updatedOrder = {
      ...order,
      ...newOrderPart,
      items: Array.isArray(newOrderPart.items)
        ? newOrderPart.items
        : order.items,
    }



    setLocalValue(updatedOrder);
  };

  useEffect(() => {
    (async () => {
      await trigger();
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order));
  }, [order]);
  
  if (!initialized || loading) return null;

  console.log("✅ order loaded from localStorage:", order);

  return (
    <CartContext.Provider
      value={{ order, setOrder, loading, error, triggerUpdate: trigger }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
