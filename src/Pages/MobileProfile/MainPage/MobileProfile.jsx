import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "../../Profile/Components/ProfileSidebar/ProfileSidebar";
import { isAuthenticated } from "../../../Utils/AuthUtils";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { Redo2 } from 'lucide-react';
import Loader from "../../../Components/Loader/Loader";

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

  if (loading) return <Loader />
  if (error) return <ErrorMessage msg={"برای دیدن داشبورد ابتدا لاگین کنید"} />


  return (
    <main className="w-full text-[#333] font-sans py-8 px-2">
      {currentUser ? (
        <div className="w-full flex flex-col gap-4">

          <div class="px-4 py-2 flex justify-start items-center  text-white rounded-lg">
            <div className="w-8 h-8 bg-blue-300 hover:bg-blue-600 rounded-full flex justify-center items-center">

              <Redo2 className="h-5 w-5 " onClick={() => goBack()} />
            </div>
          </div>

          <section className="w-full max-w-[1200px] py-0 px-4">
            <Outlet />
          </section>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800 px-4">
          <div className="max-w-md text-center p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <p className="text-lg font-semibold mb-4">
              برای دیدن پروفایل ابتدا باید لاگین کنید
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </div>
      )}

    </main>

  );
}
