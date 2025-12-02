import React, { useEffect, useMemo, useState } from "react";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import { isAuthenticated } from "../../Utils/AuthUtils";
import AdsHeader from "./Components/Ads/AdsHeader";

export default function Header({ handleHeight, onSendData }) {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [isAuth, setIsAuth] = useState(() => {
    const authStatus = isAuthenticated();
    return authStatus;
  });





   useMemo(() => {
    const sum = topbarHeight + navbarHeight
    onSendData(sum)
  }, [topbarHeight, navbarHeight])

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      const token = localStorage.getItem("authToken");
      setIsAuth(authStatus);
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  
  const handleTopbarHeightChange = (height) => {
    setTopbarHeight(height)
  }

  const handleNavbarHeightChange = (height) => {
    setNavbarHeight(height)
  }

  return (
    <header className="container absolute top-0 w-full z-50 bg-white">
      <div className=" w-full px-0 mx-0 md:max-w-7xl md:mx-auto ">
        <Topbar isAuth={isAuth} onTopbarHeightChange={handleTopbarHeightChange} />
        <Navbar isAuth={isAuth} topbarHeight={topbarHeight} onNavbarHeightChange={handleNavbarHeightChange} />
      </div>

    </header>
  );
}