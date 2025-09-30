import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ایجاد Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // اطلاعات کاربر (مثل username و token)
  const [loading, setLoading] = useState(true); // وضعیت لودینگ برای بررسی اولیه
  const navigate = useNavigate();

  // بررسی توکن ذخیره‌شده در localStorage هنگام بارگذاری اولیه
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser({ ...JSON.parse(storedUser), token });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // تابع ثبت‌نام
  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        userData
      );
      if (response.status === 201) {
        const { token } = response.data;
        const userInfo = { username: userData.username, email: userData.email };
        setUser({ ...userInfo, token });
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true, message: "ثبت نام با موفقیت انجام شد!" };
      }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "خطا در ثبت نام. لطفاً دوباره تلاش کنید.",
      };
    }
  };

  // تابع ورود (در صورت نیاز به endpoint ورود)
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        username,
        password,
      });
      if (response.status === 200) {
        const { token } = response.data;
        const userInfo = { username };
        setUser({ ...userInfo, token });
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true, message: "ورود با موفقیت انجام شد!" };
      }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "خطا در ورود. لطفاً دوباره تلاش کنید.",
      };
    }
  };

  // تابع خروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  // مقادیر ارائه‌شده توسط Context
  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// هوک برای استفاده از AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }
  return context;
};