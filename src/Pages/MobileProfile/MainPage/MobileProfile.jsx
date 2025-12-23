import { useState, useEffect } from "react";
import { Outlet ,useNavigate} from "react-router-dom";
import ProfileSidebar from "../../Profile/Components/ProfileSidebar/ProfileSidebar";
import { isAuthenticated } from "../../../Utils/AuthUtils";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { Redo2 } from 'lucide-react';

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

            <div class="px-4 py-2 flex justify-start items-center  text-white rounded-lg">
              <div className="w-8 h-8 bg-blue-300 hover:bg-blue-600 rounded-full flex justify-center items-center">

              <Redo2 className="h-5 w-5 " onClick={() => goBack()}/>
              </div>
            </div>

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
