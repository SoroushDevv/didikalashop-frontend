import { useState, useEffect } from "react";
import api from "../api/axios";

const useCardsDetails = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await api.get("/cards");
        console.log("cards: ", response.data);
        
        setCards(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError(err.message || "Failed to fetch categories");
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  return { cards, loading, error };
};

export default useCardsDetails;