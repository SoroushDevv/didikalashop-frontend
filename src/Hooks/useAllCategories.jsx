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
        const response = await api.get("/categories");
        
        setProductCategories(response.data);
      } catch (err) {
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