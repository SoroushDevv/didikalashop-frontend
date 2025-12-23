import React, { useState } from "react";
import { House, BriefcaseBusiness , MapPin } from "lucide-react";
import useUserAddresses from "../../../Hooks/useUserAddresses";
import { getAuthToken } from "../../../Utils/AuthUtils";
import api from "../../../api/axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import ShowSwal from "../../../Components/ShowSwal/ShowSwal";
import ChangeAddressModal from "../../../Components/Portal/AddressFormModal";
import Loader from "../../../Components/Loader/Loader";
export default function AddressesMobile() {
  const { userAddresses, loading, error, handleRefreshKey } = useUserAddresses();
  const token = getAuthToken();
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  if (loading)
    return (
      <Loader/>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-medium">خطا: {error}</p>
    );

  const addressTypeLabel = {
    HOME: "منزل",
    WORK: "محل کار",
    OTHER: "سایر",
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case "HOME":
        return <House className="w-4 h-4 inline ml-1" />;
      case "WORK":
        return <BriefcaseBusiness className="w-4 h-4 inline ml-1" />;
      default:
        return <MapPin className="w-4 h-4 inline ml-1" />;
    }
  };

  const onRemove = async (address) => {
    ShowSwal({
      title: "آیا از حذف آدرس اطمینان دارید؟",
      text: "",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      onConfirm: async () => {
        try {
          await api.delete(`/addresses/${address.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          handleRefreshKey();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    if (formData.isSuccess) handleRefreshKey();
  };

  return (
    <div className="flex flex-col flex-1 gap-6 p-6 bg-white rounded-xl shadow-sm font-sans">
      <div className="flex justify-start">
        <button
          onClick={handleAddNew}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-2 rounded-lg transition-all duration-200"
        >
          ایجاد آدرس جدید
        </button>
      </div>

      {userAddresses.length ? (
        <div className="flex flex-wrap gap-6">
          {userAddresses.map((address) => (
            <div
              key={address.id}
              className="flex flex-col justify-between w-full sm:w-[320px] md:w-[360px] bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col gap-2 p-4 text-right">
                <div className="inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                  {getAddressTypeIcon(address.addressType)}
                  {addressTypeLabel[address.addressType]}
                </div>

                <div className="font-semibold text-gray-800 text-base">
                  {address.userName}
                </div>

                <div className="text-sm text-gray-700">
                  {address.city}، {address.address}
                </div>

                <div className="text-sm text-gray-500">
                  کد پستی: {address.postalCode}
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  ایجاد شده در:{" "}
                  {new Date(address.createdAt).toLocaleDateString("fa-IR")}
                </div>
              </div>

              <div className="flex justify-end gap-3 px-4 pb-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="px-4 py-1.5 rounded-lg text-sm font-bold border border-rose-400 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => onRemove(address)}
                  className="px-4 py-1.5 rounded-lg text-sm font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ErrorMessage msg="آدرسی ثبت نکرده‌اید" />
      )}

      <ChangeAddressModal
        isOpen={showModal}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
        editingAddress={editingAddress}
      />
    </div>
  );
}
