import { useState, useEffect } from "react";
import api from "../api/axios";

const useAllComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await api.get("/comments");
        console.log("all comments: ", response.data);
        
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError(err.message || "Failed to fetch categories");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  
  return { comments, loading, error };
};

export default useAllComments;