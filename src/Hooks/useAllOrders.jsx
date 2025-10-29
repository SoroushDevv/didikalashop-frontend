import { useState, useEffect } from "react";
import api from "../api/axios";

const useAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await api.get("/api/orders");
        console.log("orders: ", response.data);
        
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError(err.message || "Failed to fetch categories");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useAllOrders;