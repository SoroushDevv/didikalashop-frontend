import React, { useState } from "react";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserCart from "./../../../../Hooks/useUserCart";
import Portal from "../../../../Components/Portal/Portal";
import EditInfoModal from "./../../../../Components/Modal/EditInfoModal/EditInfoModal";
import { Pencil } from "lucide-react";
import Loader from "../../../../Components/Loader/Loader";

export default function UserInfo() {
  const { currentUser, loading, error, refreshData } = useCurrentUser();
  const { shoppingCart } = useUserCart();

  const [showModal, setShowModal] = useState(false);

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-500">خطا در دریافت اطلاعات کاربر</p>;
  if (!currentUser) return <p className="text-gray-600">کاربر یافت نشد</p>;

  return (
    <div className="flex flex-col w-full gap-6 font-sans py-6">
       <div className="w-full text-right mb-4">
            <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
                اطلاعات شخصی
            </h2>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          label="نام و نام خانوادگی"
          value={`${currentUser.firstname} ${currentUser.lastname}`}
          onEdit={() => setShowModal(true)}
        />

        <InfoCard
          label="شهر"
          value={currentUser.city || "شهر"}
          onEdit={() => setShowModal(true)}
        />

        <InfoCard
          label="شماره موبایل"
          value={currentUser.phone}
          verified={currentUser.phoneVerified}
          onEdit={() => setShowModal(true)}
        />

        <InfoCard
          label="ایمیل"
          value={currentUser.email}
          onEdit={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <Portal>
          <EditInfoModal
            onClose={() => setShowModal(false)}
            user={currentUser}
            onUpdate={refreshData}
          />
        </Portal>
      )}
    </div>
  );
}

function InfoCard({ label, value, verified, onEdit }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-gray-600">{label}</p>
          {verified && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
              تاییدشده
            </span>
          )}
        </div>
        <p className="text-sm text-gray-800">{value}</p>
      </div>

      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <Pencil size={20} stroke="red"/>
      </button>
    </div>
  );
}
