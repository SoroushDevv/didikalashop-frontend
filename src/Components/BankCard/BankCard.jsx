import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api/axios";
import ShowSwal from "../ShowSwal/ShowSwal";
import useUserCards from "../../Hooks/useUserCards"; 


const BankCard = ({
  cardId,
  bankLogo,
  cardNumber,
  cardHolder,
  bankTitle,
  user,
  refreshCards
}) => {
  const [userCardNumber, setUserCardNumber] = useState(cardNumber);

  const handleDeleteCard = (e, cardId) => {
    e.preventDefault()
    ShowSwal({
      title: "از حذف این کارت اطمینان دارید؟", text: "حذف کارت", icon: "warning", showConfirmButton: true, showCancelButton: true, confirmButtonText: "بله", cancelButtonText: "خیر", onConfirm: async () => {

        try {
          const response = await api.delete(`/cards/${cardId}`)
          if (response.status === 200) {
            ShowSwal({ title: "حذف شد", text: "", icon: "success" })

          } else {
            ShowSwal({ title: "مشکلی پیش امده لطفا چند دقیقه بعد سعی کنید", text: "", icon: "warning" })

          }
          refreshCards()

        } catch (err) {
          console.log(err)
        }
      }
    })


  }

  const displayCardHolder = user.username && user.lastname ? (user.firstname + " " + user.lastname) : user.username;

  return (
    <div className="p-4">
      <div className="relative w-80 h-48 bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between text-white font-sans overflow-hidden">
        
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-xl"></div>

        <div className="flex justify-between items-start">
          <div className="bank-logo w-10 h-10">
            <img 
              src={`/img/banks/${bankLogo}.png`} 
              alt="لوگوی بانک" 
              className="w-full h-full object-contain"
            />
          </div>
        
          <div className="bank-title text-sm font-bold tracking-wider">{bankTitle}</div>
        </div>

        <input
          className="card-number mt-4 w-full bg-transparent border-b border-gray-600 focus:border-yellow-500 text-center text-xl font-mono tracking-widest outline-none transition duration-300 placeholder-gray-400 [appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          type="text" 
          placeholder="شماره کارت بانکی"
          value={userCardNumber}
          onChange={(e) => {
            setUserCardNumber(e.target.value);
          }}
        
          maxLength="16"
          readOnly 
        />

        <div className="card-holder mt-2 text-xs opacity-75 self-end text-right">
          {displayCardHolder}
        </div>

        <button 
          className="absolute top-2 left-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-md transition duration-200" 
          onClick={(e) => handleDeleteCard(e, cardId)}
        >
          حذف کارت
        </button>
      </div>
    </div>

  );
};

BankCard.propTypes = {
  cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bankLogo: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  bankTitle: PropTypes.string.isRequired,
  cardHolder: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  refreshCards: PropTypes.func.isRequired,
};


export default BankCard;