import { createContext, useContext, useEffect } from "react";
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

  const setOrder = (newOrderPart) => {
    setLocalValue((prevOrder) => ({
      ...prevOrder,
      ...newOrderPart,
      items: Array.isArray(newOrderPart.items)
        ? newOrderPart.items
        : prevOrder.items,
    }));
  };

  useEffect(() => {
    trigger(); // sync اولیه از localStorage
  }, []);

  console.log("order in useCart : ", order)
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
