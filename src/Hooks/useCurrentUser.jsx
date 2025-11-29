import { useState, useEffect } from "react";
import { getAuthToken } from "../Utils/AuthUtils";
import api from "../api/axios";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(1)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        console.log("token:", token);

        if (!token) {
          setCurrentUser(null);
          return;
        }

        const response = await api.get("/users");
        console.log("response : ", response)
        const users = response.data;


        const user = users.find((u) => u.token === token);
        console.log("user : ", user)
        setCurrentUser(user || null);
      } catch (err) {
        console.error("erooor:", err);
        setError(err.message || "Failed to fetch user");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [refreshKey]);

  const refreshData = () => setRefreshKey((prev) => prev + 1)



  console.log("current user current : ", currentUser)

  return { currentUser, loading, error, refreshData };
};
