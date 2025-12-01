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
        const response = await api.get("/orders");        
        setOrders(response.data);
      } catch (err) {
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