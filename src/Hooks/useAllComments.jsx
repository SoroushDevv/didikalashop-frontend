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
        const response = await api.get("/comments");
        
        setComments(response.data);
      } catch (err) {
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