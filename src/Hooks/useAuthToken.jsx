import { useState, useCallback, useEffect } from 'react';
import { getAuthToken,removeAuthToken,setAuthToken } from '../Utils/AuthUtils';

function useAuthToken() {

  const [authTokenState,useAuthTokenState] = useState(getAuthToken())



  const [isAuthenticated, setIsAuthenticated] = useState(!!authTokenState);

  useEffect(() => {
    setIsAuthenticated(!!authTokenState);
  }, [authTokenState]);

 
  
  return {
    authTokenState, // مقدار توکن فعلی
    isAuthenticated, // وضعیت احراز هویت (true اگر توکن وجود داشته باشد)
  };
}

export default useAuthToken;