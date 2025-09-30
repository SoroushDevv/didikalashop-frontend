// useUserOrders.js
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { getAuthToken } from "../Utils/AuthUtils";

const SOCKET_URL = "http://localhost:8000"; // آدرس بک‌اند

const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken()
  // یک بار سفارش‌ها رو از API بگیریم
  const fetchOrders = async () => {
 
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${SOCKET_URL}/api/orders/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data || []);
    } catch (err) {
      setError(err.message || "خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchOrders();

    // اتصال به socket
    const socket = io(SOCKET_URL, {
      query: { userId },
      auth: { token: getAuthToken() },
    });

    // وقتی سفارش جدید ساخته شد
    socket.on("order_created", (newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
    });

    // وقتی سفارش آپدیت شد (مثلاً از active → delivered رفت)
    socket.on("order_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
    });

    // وقتی سفارشی حذف شد
    socket.on("order_deleted", (orderId) => {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
  return { orders, loading, error };
};

export default useUserOrders;
