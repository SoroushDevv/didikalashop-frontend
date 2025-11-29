import React, { useState } from "react";
import Portal from "./../../../Components/Portal/Portal" 

export default function AddCardModal({ show, onClose, onAddCard }) {
  const [cardNumber, setCardNumber] = useState("");

  if (!show) return null;

  const handleAdd = () => {
    if (cardNumber.length === 16) {
      onAddCard(cardNumber);
      setCardNumber("");
      onClose();
    } else {
    }
  };

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-[1000] flex justify-center items-center p-4" 
        onClick={onClose}
        dir="rtl"
      >
        <div 
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col items-center space-y-5 transform transition-all duration-300 scale-100" 
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold text-gray-800">افزودن کارت بانکی جدید</h3>
          
          <input
            type="text"
            maxLength="16"
            placeholder="**** **** **** ****"
            value={cardNumber.replace(/(\d{4})/g, '$1 ').trim()} // فرمت نمایشی کارت
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center text-xl font-mono tracking-widest p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition shadow-inner"
          />
          
          <button 
            className={`w-full py-2 font-semibold rounded-lg transition duration-200 
              ${cardNumber.length === 16 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" 
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`
            }
            onClick={handleAdd}
            disabled={cardNumber.length !== 16}
          >
            تایید
          </button>
        </div>
      </div>
    </Portal>
  );
}