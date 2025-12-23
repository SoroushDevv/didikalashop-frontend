import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./Components/ProfileSidebar/ProfileSidebar";
import { isAuthenticated } from "../../Utils/AuthUtils";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import Loader from "../../Components/Loader/Loader";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, loading } = useCurrentUser();

 
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-sm text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            دسترسی محدود
          </h2>
          <p className="text-gray-600 mb-6">
            برای دیدن پروفایل خود ابتدا باید وارد حساب کاربری شوید.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            ورود / Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full text-[#333] font-sans py-8 bg-gray-50 min-h-screen">
      <div className="w-full flex flex-col md:flex-row-reverse gap-6 max-w-[1200px] mx-auto">
        <div className="bg-white border rounded-2xl shadow-md p-5 mb-5 md:hidden">
          <div className="flex flex-col justify-center">
            <div className="w-full flex justify-between items-center gap-3 mb-3">
              <div className="h-full w-auto flex-1">
                <img
                  src="/img/profile-pic/def-avatar.jpg"
                  alt="avatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 w-full h-full">
                <span className="font-bold text-lg">
                  {currentUser?.firstname
                    ? currentUser.firstname + " " + currentUser.lastname
                    : currentUser.username}
                </span>
                <span className="text-gray-500 text-sm">{currentUser.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="basis-2/3 md:basis-2/3 p-0">
          <Outlet />
        </section>

        <aside className="basis-1/3 py-6 pr-6 md:sticky md:top-4 h-fit">
          <ProfileSidebar />
        </aside>
      </div>
    </main>
  );
}
