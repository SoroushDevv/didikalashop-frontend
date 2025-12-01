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
        const response = await api.get("/offs");
        
        setOffs(response.data);
      } catch (err) {
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