
export const setAuthToken = (token) => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      localStorage.setItem("authToken", token); // ذخیره توکن به‌صورت رشته
      return true;
    } catch (error) {
      console.error("Error setting auth token:", error);
      return false;
    }
  };
  
  
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token || token === "null" || token === "") {
      return null;
    }
    console.log("token : " , token)
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

  export const removeAuthToken = () => {
    try {
      setAuthToken(null);
      return true;
    } catch (error) {
      console.error("Error removing auth token:", error);
      return false;
    }
  };
  

export const isAuthenticated = () => {
  try {
    const token = getAuthToken();
    return !!token;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
