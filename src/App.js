import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRoutes, useLocation } from 'react-router-dom';
import routes from './routes.js';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';
import { AuthProvider, useAuth } from './Contexts/AuthContext.jsx';
import { useLocalStorageWatcher } from './Utils/StorageUtils.jsx';
import { CartProvider } from './Contexts/CartContext.jsx';
import { DiscountProvider } from './Contexts/DiscountContext.jsx';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function AppContent() {

  let router = useRoutes(routes);
  const mainContentRef = useRef(null)
  const [value, setValue] = useState(0)
  const [mainContentHeight, setMainContentHeight] = useState(null)

  const { isAuthenticatedState } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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

  console.log("value :", value)
  return (
    <div className="App flex flex-col min-h-screen">
      <div className=" w-full mx-0 px-2 md:mx-auto md:max-w-7xl flex-grow">
        {!noHeaderRoutes.includes(location.pathname) && (
          <Header authToken={authToken} onSendData={handleOnSendData} />
        )}

        <div className={`w-full mx-0 px-0 md:max-w-7xl md:mx-auto md:px-4 ${isScrolled ? ' scrolled' : ''} z-10 `} ref={mainContentRef} style={{ paddingTop: `${value}px` }}>
          {/* <div className={`sticky w-full mx-0 px-0 md:max-w-7xl md:mx-auto md:px-4 ${isScrolled ? ' scrolled' : ''} z-10`} ref={mainContentRef} style={{top:`${value}px`}}> */}
          {React.cloneElement(router, { isAuthenticatedState })}
        </div>

      </div>
      <Footer isAuthenticated={isAuthenticatedState} top={mainContentHeight ? mainContentHeight + value : "100vh"} />
      <section className="fixed bottom-0 left-0 right-0 w-full h-16 bg-white shadow-lg flex items-center justify-center z-50 md:hidde lg:hidden backdrop-blur-lg bg-opacity-90">
        <div className="container bg-brand-primary mx-auto px-4 ">

          <ul className="flex justify-around items-center w-full">
            <li className="flex flex-col items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200">
              <a className="text-inherit flex flex-col justify-between items-center" href="/" >
                <OtherHousesOutlinedIcon />
                <span>خانه</span>

              </a>

            </li>

            <li className="flex flex-col items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200">
              <a className="text-inherit flex flex-col justify-between items-center" href="/" >
                <MenuOutlinedIcon />
                <span>دسته بندی ها</span>

              </a>

            </li>
            <li className="flex flex-col items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200">
              <a className="text-inherit flex flex-col justify-between items-center" href="/cart" >
                <ShoppingBagOutlinedIcon />
                <span> سبد خرید </span>

              </a>

            </li>
            <li className="flex flex-col items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200">
              <a className="text-inherit flex flex-col justify-between items-center" href="/profile" >
                <PersonOutlinedIcon />
                <span>پروفایل</span>

              </a>

            </li>
          </ul>
        </div>
      </section>
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
