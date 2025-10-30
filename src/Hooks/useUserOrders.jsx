import { useState, useEffect } from "react";
import { getAuthToken } from "../Utils/AuthUtils";
import { useCurrentUser } from "./useCurrentUser";
import api from "../api/axios";


const useUserOrders = () => {
  const {currentUser} = useCurrentUser()
  const [userOrders, setUserOrders] = useState([]);
  const [userOrdersloading, setOrdersLoading] = useState(true);
  const [userOrdersError, setOrdersError] = useState(null);
  const [refreshKey,setRefreshKey] = useState(0)
 console.log("curr user:", currentUser)




 
  useEffect(() => {

   
    const fetchOrders = async () => {
     

      setOrdersLoading(true);
      try {
         const token = getAuthToken();

         console.log("user id", currentUser.id)
        const ordersResponse = await api.get(`/orders/user/${currentUser.id}`);

        const orders = ordersResponse.data || [];
        console.log("useUserorders : ", orders);
        setUserOrders(orders);
        setOrdersError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        let errorMessage = err.response?.data?.error || err.message || "خطا در دریافت سفارش ها";
        if (err.response?.status === 401) {
          errorMessage = "لطفاً ابتدا وارد حساب کاربری خود شوید";
        }
        setOrdersError(errorMessage);
        setUserOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders(); // صدا زدن تابع async
  }, [currentUser?.id,refreshKey]);

  const handleRefreshKey = () => {setRefreshKey(prev => prev+1)}

  console.log("userOrders::",userOrders)
  return { userOrders, userOrdersloading, userOrdersError ,handleRefreshKey};
};

export default useUserOrders;
