import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser({ ...JSON.parse(storedUser), token });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }
  return context;
};