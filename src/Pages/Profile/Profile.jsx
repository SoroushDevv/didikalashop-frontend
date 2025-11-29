import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import "./Profile.css";
import ProfileSidebar from "./Components/ProfileSidebar/ProfileSidebar";
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
<main className="w-full text-[#333] font-sans py-8">
  {currentUser ? (
    <div className="w-full flex flex-col  md:flex-row-reverse gap-4">
      <div className="bg-white border rounded-2xl shadow-md p-5 mb-5 md:hidden">
        <div className="flex flex-col justify-center">
          <div className="w-full flex justify-between items-center gap-3 mb-3">
            <div className="h-full w-auto flex-1">
              <img src="/img/profile-pic/def-avatar.jpg" alt="avatar" className="rounded-full" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
              <span className="font-bold text-[1rem]">
                {currentUser?.firstname
                  ? currentUser.firstname + " " + currentUser.lastname
                  : currentUser.username}
              </span>
              <span className="text-[1rem] text-[#777] mt-1">{currentUser.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="basis-2/3 md:basis-2/3 max-w-[1200px] p-0">
        <Outlet />
      </section>

      <aside className="basis-1/3 py-6 pr-6 md:sticky md:top-4 h-fit">
        <ProfileSidebar />
      </aside>

    </div>
  ) : (
    <ErrorMessage msg={"برای دیدن داشبورد ابتدا لاگین کنید"} />
  )}
</main>

  );
}
