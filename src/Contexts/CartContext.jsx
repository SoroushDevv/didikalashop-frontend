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
    setLocalValue((prevOrder) => ({
      ...prevOrder,
      ...newOrderPart,
      items: Array.isArray(newOrderPart.items)
        ? newOrderPart.items
        : prevOrder.items,
    }));
  };

  // 🌀 بارگذاری اولیه از localStorage
  useEffect(() => {
    (async () => {
      await trigger(); // همگام‌سازی اولیه با localStorage
      setInitialized(true); // فقط بعد از sync اولیه مقداردهی مجاز میشه
    })();
  }, []);

  // تا زمانی که مقدار از localStorage لود نشده هیچی نده
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
