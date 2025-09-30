import React, { useState } from "react";
import "./UserAddresses.css"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip
} from "@mui/material";
import { Home, Work, LocationOn } from "@mui/icons-material";
import useUserAddresses from "../../../../Hooks/useUserAddresses";
import { getAuthToken } from "../../../../Utils/AuthUtils";
import axios from "axios";
import ErrorMessage from "./../../../ErrorMessage/ErrorMessage"
import ShowSwal from "../../../../Components/ShowSwal/ShowSwal";
import Portal from "../../../../Components/Portal/Portal";
import EditAddressForm from "./EditAddressForm/EditAddressForm";
import AddAddressForm from "./AddNewAddress/AddNewAddress"
import ChangeAddressModal from "./../../../../Components/Portal/changeAddressModal"


export default function UserAddresses() {
  const { userAddresses, loading, error, handleRefreshKey } = useUserAddresses();
  const token = getAuthToken()
  const [showPortal, setShowPortal] = useState(false)
  const [editingAddress,setEditingAddress] = useState(null)
  const [addressId, setAddressId] = useState(null)
  const [showAddAddressPortal, setShowAddAddressPortal] = useState(false)

  if (loading) return <Typography>در حال بارگذاری...</Typography>;
  if (error) return <Typography color="error">خطا: {error}</Typography>;


  const getAddressTypeIcon = (type) => {
    switch (type) {
      case "HOME":
        return <Home fontSize="small" />;
      case "WORK":
        return <Work fontSize="small" />;
      default:
        return <LocationOn fontSize="small" />;
    }
  };


  const onRemove = async (address) => {
    try {
      ShowSwal({
        title: "ایا از حذف ادرس اطمینان دارید؟", text: "", icon: "warning", showConfirmButton: true, showCancelButton: true, confirmButtonText: "بله", cancelButtonText: "کنسل", onConfirm: async () => {

          const res = await axios.delete(`http://localhost:8000/api/addresses/${address.id}`, {
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            }
          })
          handleRefreshKey()
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      console.log("complete:))")
    }
  }

  const handleEdit = (address) => {

    setEditingAddress(address)
    setShowAddAddressPortal(true)
  }


  console.log(showPortal)


  const handleAddNewAddress = async (formData) => {


      if(formData.isSuccess) {
    
          handleRefreshKey();
        
     
      }
  }

  console.log("userAdreses : ", userAddresses)

 
  return (
  <div className="address-conatiner">
  {/* دکمه ایجاد آدرس جدید */}
  <div className="address-header">
    <div
      className="add-new-address-btn"
      onClick={() => {
        setEditingAddress(null)
        setShowAddAddressPortal(true) 
      }}
    >
      ایجاد آدرس جدید
    </div>
  </div>

  {/* لیست آدرس‌ها */}
  {userAddresses.length ? (
    <div className="address-list">
      {userAddresses.map((address) => (
        <div key={address.id} className="address-card">
          <div className="card-content">
            <div className="address-type">{address.addressType}</div>
            <div className="user-name">{address.userName}</div>
            <div className="address-details">
              {address.city}، {address.address}
            </div>
            <div className="postal-code">کدپستی: {address.postalCode}</div>
            <div className="created-at">
              ایجاد شده در: {new Date(address.createdAt).toLocaleDateString("fa-IR")}
            </div>
          </div>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => handleEdit(address)}
            >
              ویرایش
            </button>
            <button
              className="delete-btn"
              onClick={() => onRemove(address)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <ErrorMessage msg={"آدرسی ثبت نکرده‌اید"} />
  )}

  {/* مودال تغییر/افزودن آدرس */}
  <ChangeAddressModal
    isOpen={showAddAddressPortal}
    onSave={handleAddNewAddress}
    onClose={() => setShowAddAddressPortal(false)}
    editingAddress={editingAddress}
  />
</div>


  );
}
