import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../Profile/Components/ProfileSidebar/ProfileSidebar";
import { isAuthenticated } from "../../../Utils/AuthUtils";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export default function MobileProfile() {
  const { currentUser, loading, error } = useCurrentUser()
  const [isLogedIn, setIsLogedIn] = useState(isAuthenticated())

  const navigate = useNavigate()


  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (isLogedIn === false) {
      navigate("/")
    }

  }, isLogedIn)



  return (
    <main className="w-full text-[#333] font-sans py-8 px-2">

      {currentUser ? (
        <div className="w-full flex flex-col gap-4">

            <button
              onclick={() => goBack()}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              بازگشت
            </button>

   


          <section className="w-full max-w-[1200px] py-0 px-4">
            <Outlet />
          </section>


        </div>
      ) : (
        <ErrorMessage msg={"برای دیدن داشبورد ابتدا لاگین کنید"} />
      )}
    </main>

  );
}
