import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useCurrentUser } from "./useCurrentUser";
import api from "../api/axios";

const useUserCards = () => {
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();
  const [currentUserCards, setCurrentUserCards] = useState([]);
  const [userCardsLoading, setUserCardsLoading] = useState(true);
  const [userCardsError, setUserCardsError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const fetchUserCards = async () => {
      console.log("📌 fetching user cards for:", currentUser.id);
      setUserCardsLoading(true);
      try {
        const response = await api.get(`/api/cards/user/${currentUser.id}`);
        console.log("✅ userCards:", response.data);
        setCurrentUserCards(response.data);
        setUserCardsError(null);
      } catch (err) {
        console.error("❌ Error fetching user cards:", err.message);
        setUserCardsError(err.message || "Failed to fetch user cards");
        setCurrentUserCards([]);
      } finally {
        setUserCardsLoading(false);
      }
    };

    fetchUserCards();
  }, [currentUser, refreshKey]);  // 👈 userLoading حذف شد

  const refreshCards = useCallback(() => setRefreshKey(prev => prev + 1), []);

  console.log(currentUserCards)
  return { currentUserCards, userCardsLoading, userCardsError, refreshCards };
};

export default useUserCards;
