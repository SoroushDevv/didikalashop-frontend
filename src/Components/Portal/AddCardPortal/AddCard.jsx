import React, { useState } from "react";
import Portal from "./../../../Components/Portal/Portal" 
import "./AddCard.css";



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
      <div className="modal-overlay" onClick={onClose} style={{margin:"10px 5px"}}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>افزودن کارت بانکی جدید</h3>
          <input
            type="text"
            maxLength="16"
            placeholder="---- ---- ---- ----"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            className="card-input"
          />
          <button className="card-button" onClick={handleAdd}>
            تایید
          </button>
        </div>
      </div>
    </Portal>
  );
}
