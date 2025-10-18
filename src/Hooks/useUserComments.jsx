// src/Hooks/useUserComments.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../Utils/AuthUtils";
import api from "../api/axios";

const useUserComments = () => {
  const [userComments, setUserComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();

        if (!token) {
          console.log("No token found in localStorage");
          setError("No token provided");
          setUserComments([]);
          return;
        }

        // دریافت کاربران و پیدا کردن کاربر جاری
        const usersResponse = await api.get("/api/users")

        const currentUser = usersResponse.data.find((user) => user.token === token);

        if (!currentUser) {
          console.log("No user found with matching token");
          throw new Error("User not found");
        }
        setCurrentUser(currentUser);

        // دریافت محصولات (برای جزئیات محصول در کامنت‌ها)
        const productsResponse = await api.get("/api/products");

        // دریافت کامنت‌ها
        const commentsResponse = await api.get("/api/comments");

        // فیلتر کردن کامنت‌های کاربر جاری و افزودن جزئیات محصول
        const userComments = commentsResponse.data
          .filter((comment) => comment.userID === currentUser.id)
          .map((comment) => {
            const product = productsResponse.data.find((p) => p.id === comment.productID);
            return {
              ...comment,
              productTitle: product ? product.title : "محصول ناموجود",
              productImage: product ? product.image : "",
            };
          });

        setUserComments(userComments);
      } catch (err) {
        console.error("Error fetching comments:", err.message);
        setError(err.message || "Failed to fetch comments");
        setUserComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return { userComments, loading, error };
};

export default useUserComments;