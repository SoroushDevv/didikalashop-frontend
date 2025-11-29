import { useState, useCallback, useEffect } from 'react';
import { getAuthToken,removeAuthToken,setAuthToken } from '../Utils/AuthUtils';

function useAuthToken() {

  const [authTokenState,useAuthTokenState] = useState(getAuthToken())



  const [isAuthenticated, setIsAuthenticated] = useState(!!authTokenState);

  useEffect(() => {
    setIsAuthenticated(!!authTokenState);
  }, [authTokenState]);

 
  
  return {
    authTokenState,
    isAuthenticated,
  };
}

export default useAuthToken;