
import api from "../api/axios";


const apiClient = api.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("Interceptor: Token =", JSON.stringify(token));
    if (token && token !== "null" && token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleError = (error) => {
  console.error("API Error:", error.response ? error.response.data : error.message);
  throw error.response ? error.response.data : { message: "Network Error" };
};

const apiUtils = {
  async get(endpoint) {
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async post(endpoint, data) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response;
    } catch (error) {
      handleError(error);
    }
  },

  async put(endpoint, data) {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async delete(endpoint) {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  products: {
    getAll: () => apiUtils.get("products"),
    getById: (id) => apiUtils.get(`products/${id}`),
    create: (data) => apiUtils.post("products", data),
    update: (id, data) => apiUtils.put(`products/${id}`, data),
    delete: (id) => apiUtils.delete(`products/${id}`),
  },

  comments: {
    getAll: () => apiUtils.get("comments"),
    getById: (id) => apiUtils.get(`comments/${id}`),
    create: (data) => apiUtils.post("comments", data),
    update: (id, data) => apiUtils.put(`comments/${id}`, data),
    delete: (id) => apiUtils.delete(`comments/${id}`),
  },

  users: {
    getAll: () => apiUtils.get("users"),
    getById: (id) => apiUtils.get(`users/${id}`),
    create: (data) => apiUtils.post("users", data),
    update: (id, data) => apiUtils.put(`users/${id}`, data),
    delete: (id) => apiUtils.delete(`users/${id}`),
    getCurrentUser: () => apiUtils.get("users/me"),
    register: async (data) => {
      try {
        const response = await apiUtils.post("users/register", data);
        console.log("Register API response:", response);
        if (response.token) {
          localStorage.setItem("authToken", response.token);
          console.log("Token saved to localStorage:", response.token);
        } else {
          console.warn("No ascendedNoToken received in register response");
        }
        return response;
      } catch (error) {
        handleError(error);
      }
    },
  },

  orders: {
    getAll: () => apiUtils.get("orders"),
    getById: (id) => apiUtils.get(`orders/${id}`),
    create: async (userID, data) => {
      console.log("data for creating orders: ", data);
      try {
        console.log("apiUtils.orders.create inputs:", { userID, data });
        if (!userID || !data?.productID || !data?.price) {
          throw new Error("شناسه کاربر و اطلاعات محصول (شناسه و قیمت) اجباری هستند");
        }

        const orderItem = {
          userID,
          productID: data.productID,
          count: data.quantity || 1,
          price: data.price,
          date: data.date,
          hour: data.hour,
          color: data.color || null,
        };

        console.log("order item that send to api: ", orderItem);
        console.log("Final payload sent to API:", JSON.stringify(orderItem, null, 2));
        const response = await apiUtils.post("orders", orderItem);
        console.log("response for sending order to api: ", response);
        return response;
      } catch (error) {
        handleError(error);
      }
    },
    update: async (id, data) => {
      try {
        console.log("apiUtils.orders.update inputs:", { id, data });

        if (!id || isNaN(id)) {
          throw new Error("شناسه سفارش نامعتبر است");
        }

        if (data?.isActive === undefined && !data?.color && data?.quantity === undefined) {
          throw new Error("حداقل یکی از فیلدهای isActive، color یا quantity باید ارائه شود");
        }

        if (data.quantity !== undefined && (isNaN(data.quantity) || data.quantity < 0)) {
          throw new Error("مقدار quantity باید یک عدد غیرمنفی باشد");
        }

        const updateData = {};
        if (data.isActive !== undefined) updateData.isActive = data.isActive;
        if (data.color !== undefined && data.color !== null && data.color !== "") updateData.color = data.color;
        if (data.quantity !== undefined) updateData.quantity = data.quantity;

        console.log("update payload sent to API:", JSON.stringify(updateData, null, 2));

        const response = await apiUtils.put(`/orders/active-order/${id}`, updateData);
        console.log("response for updating order:", response);
        return response;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            throw new Error("سفارش یافت نشد یا مسیر API نادرست است");
          } else if (error.response.status === 400) {
            throw new Error(error.response.data.message || "درخواست نامعتبر است");
          }
        }
        throw new Error(`خطا در ارتباط با سرور: ${error.message}`);
      }
    },
    delete: (id) => apiUtils.delete(`orders/${id}`),
  },

  offs: {
    getAll: () => apiUtils.get("offs"),
    getById: (id) => apiUtils.get(`offs/${id}`),
    create: (data) => apiUtils.post("offs", data),
    update: (id, data) => apiUtils.put(`offs/${id}`, data),
    delete: (id) => apiUtils.delete(`offs/${id}`),
  },

  admins: {
    getAll: () => apiUtils.get("admins"),
    getById: (id) => apiUtils.get(`admins/${id}`),
    create: (data) => apiUtils.post("admins", data),
    update: (id, data) => apiUtils.put(`admins/${id}`, data),
    delete: (id) => apiUtils.delete(`admins/${id}`),
  },

  addresses: {
    getAll: () => apiUtils.get("addresses"),
    getById: (id) => apiUtils.get(`addresses/${id}`),
    create: (data) => apiUtils.post("addresses", data),
    update: (id, data) => apiUtils.put(`addresses/${id}`, data),
    delete: (id) => apiUtils.delete(`addresses/${id}`),
  },
};

export default apiUtils;