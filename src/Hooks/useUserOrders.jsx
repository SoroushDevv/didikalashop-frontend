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
  
  useEffect(() => {

   
    const fetchOrders = async () => {
     

      setOrdersLoading(true);
      try {
         const token = getAuthToken();

        const ordersResponse = await api.get(`/orders/user/${currentUser.id}`,{
          headers:{
            Authorization : `bearer ${token}`,
            "content-type" : "application/json",
          }
        });

        const orders = ordersResponse.data || [];
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

    fetchOrders(); 
  }, [currentUser?.id,refreshKey]);

  const handleRefreshKey = () => {setRefreshKey(prev => prev+1)}
  return { userOrders, userOrdersloading, userOrdersError ,handleRefreshKey};
};

export default useUserOrders;
