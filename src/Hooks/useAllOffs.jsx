import { useState, useEffect } from "react";
import api from "../api/axios";

const useOffs = () => {
  const [offs, setOffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffs = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await api.get("/offs");
        console.log("offs: ", response.data);
        
        setOffs(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError(err.message || "Failed to fetch categories");
        setOffs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffs();
  }, []);

  return { offs, loading, error };
};

export default useOffs;