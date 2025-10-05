import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRoutes, useLocation } from 'react-router-dom';
import routes from './routes';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import { useLocalStorageWatcher } from './Utils/StorageUtils';
import { CartProvider } from './Contexts/CartContext';
import { DiscountProvider } from './Contexts/DiscountContext';

function AppContent() {

  const mainContentRef = useRef(null)
  const [value, setValue] = useState(0)
  const [mainContentHeight, setMainContentHeight] = useState(null)

  const { isAuthenticatedState } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  let router = useRoutes(routes);
  const noHeaderRoutes = ['/login', '/register'];

  useEffect(() => {

    if (mainContentRef.current) {
      setMainContentHeight(mainContentRef.current.offsetHeight)

    }
    const HandleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', HandleScroll);
    return () => window.removeEventListener('scroll', HandleScroll);
  }, [isScrolled]);

  const authToken = useLocalStorageWatcher('authToken');

  const handleOnSendData = (value) => {
    setValue(value)
  }


  return (
    <div className="App">
      <div className="main-wrapper">
        {!noHeaderRoutes.includes(location.pathname) && (
          <Header authToken={authToken} onSendData={handleOnSendData} />
        )}

        <div className={isScrolled ? 'main-content-wrapper scrolled' : 'main-content-wrapper'} ref={mainContentRef} style={{ position: "absolute", top: value }}>
          {React.cloneElement(router, { isAuthenticatedState })}
        </div>

        <Footer isAuthenticated={isAuthenticatedState} top={mainContentHeight ? mainContentHeight + value : "100vh"} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <DiscountProvider>
            <AppContent endDate="2025-08-20T23:59:59" />
          </DiscountProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
