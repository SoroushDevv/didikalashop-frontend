import { useState, useEffect } from 'react';



export const setLocalStorage = (key, value) => {
    try {
      if (!key || value === undefined) {
        throw new Error("Key and value are required");
      }
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting LocalStorage for key "${key}":`, error);
      return false;
    }
  };

export function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    if (key === 'authToken') {
        return value;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        console.error(`Error parsing localStorage for key "${key}":`, e);
        return value; 
    }
}
  

  export const removeLocalStorage = (key) => {
    try {
      if (!key) {
        throw new Error("Key is required");
      }
      setLocalStorage(key, null);
      return true;
    } catch (error) {
      console.error(`Error removing LocalStorage for key "${key}":`, error);
      return false;
    }
  };
  

  export const setSessionStorage = (key, value) => {
    try {
      if (!key || value === undefined) {
        throw new Error("Key and value are required");
      }
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting SessionStorage for key "${key}":`, error);
      return false;
    }
  };
  

  export const getSessionStorage = (key) => {
    try {
      if (!key) {
        throw new Error("Key is required");
      }
      const serializedValue = sessionStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`Error getting SessionStorage for key "${key}":`, error);
      return null;
    }
  };
  
 
  export const removeSessionStorage = (key) => {
    try {
      if (!key) {
        throw new Error("Key is required");
      }
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing SessionStorage for key "${key}":`, error);
      return false;
    }
  };
  

  export const clearLocalStorage = () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing LocalStorage:", error);
      return false;
    }
  };
  

  export const clearSessionStorage = () => {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing SessionStorage:", error);
      return false;
    }
  };


  export const useLocalStorageWatcher = (key) => {
  const [value, setValue] = useState(getLocalStorage(key));

  useEffect(() => {
    // مقدار اولیه از localStorage
    setValue(getLocalStorage(key));

    // بررسی تغییرات localStorage
    const handleStorageChange = (e) => {
      if (e.key === key || e.key === null) {
        const newValue = getLocalStorage(key);
        setValue(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // cleanup
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]); // حساس به تغییر key

  return value;
}