import { useState, useEffect } from "react";
import ShowSwal from "../Components/ShowSwal/ShowSwal";
import { getAuthToken } from "../Utils/AuthUtils";
import api from "../api/axios";


const useUserAddresses = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey,setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = getAuthToken();

      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const addressesResponse = await api.get(`/api/addresses`, config);
        const addresses = addressesResponse.data || [];
        console.log("useUserAddresses : ", addressesResponse);
        setUserAddresses(addresses);
        setError(null);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        let errorMessage = err.response?.data?.error || err.message || "خطا در دریافت آدرس‌ها";
        if (err.response?.status === 401) {
          errorMessage = "لطفاً ابتدا وارد حساب کاربری خود شوید";
        }
        ShowSwal({ icon: "error", title: errorMessage });
        setError(errorMessage);
        setUserAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses(); // صدا زدن تابع async
  }, [refreshKey]);

  const handleRefreshKey = () => {setRefreshKey(prev => prev+1)}

  console.log(userAddresses)
  return { userAddresses, loading, error ,handleRefreshKey};
};

export default useUserAddresses;
