import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import "./Profile.css";
import SplideProductCarousel from "../../Components/ProductCarousel/ProductCarousel";
import ProfileSidebar from "./Components/ProfileSidebar/ProfileSidebar";
import { shopProducts } from "./../../datas";
import { isAuthenticated } from "../../Utils/AuthUtils";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import ErrorMessage from "./../ErrorMessage/ErrorMessage"

export default function Profile() {
  const { currentUser, loading, error } = useCurrentUser()
  const [isLogedIn, setIsLogedIn] = useState(isAuthenticated())



  const navigate = useNavigate()


  useEffect(() => {
    if (isLogedIn === false) {
      navigate("/")
    }

  }, isLogedIn)



  return (
    <main className="dashboard-main">
      <div className="container">

        {currentUser ? (
          <div className="dashboard-row">
            <aside className="dashboard-sidebar">
              <ProfileSidebar />
            </aside>
            <section className="dashboard-content">
              <Outlet />
            </section>
          </div>
        ) : (
          <ErrorMessage msg={"برای دیدن داشبورد ابتدا لاگین کنید"} />
        )}

  

      </div>
    </main>
  );
}
