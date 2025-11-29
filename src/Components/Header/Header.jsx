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
    console.log("Initial auth status:", authStatus, "Token:", localStorage.getItem("authToken"));
    return authStatus;
  });





   useMemo(() => {
    console.log("topbar height + navbarHeight :", topbarHeight + " " + navbarHeight)
    const sum = topbarHeight + navbarHeight
    console.log("sum of heights :", sum)
    onSendData(sum)
    console.log("sum :", sum)
  }, [topbarHeight, navbarHeight])

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      const token = localStorage.getItem("authToken");
      console.log("Checking auth status:", authStatus, "Token:", token);
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
    <header className="container absolute top-0 w-full z-50">
      <div className=" w-full px-0 mx-0 md:max-w-7xl md:mx-auto md:px-4 ">
        <Topbar isAuth={isAuth} onTopbarHeightChange={handleTopbarHeightChange} />
        <Navbar isAuth={isAuth} topbarHeight={topbarHeight} onNavbarHeightChange={handleNavbarHeightChange} />
      </div>

    </header>
  );
}