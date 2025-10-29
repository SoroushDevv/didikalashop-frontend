import { useState, useEffect } from "react";
import api from "../api/axios";

const useAllCategories = () => {
  const [categories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await api.get("/api/categories");
        console.log("categories: ", response.data);
        
        setProductCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError(err.message || "Failed to fetch categories");
        setProductCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useAllCategories;