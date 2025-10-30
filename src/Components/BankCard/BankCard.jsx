import React, { useState } from "react";
import "./BankCard.css";
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
  return (
    <div className="bank-card__container">
      <div className="bank-card">
        <div className="bank-info">
          <div className="bank-logo">
            <img src={`/img/banks/${bankLogo}.png`} alt="لوگوی بانک" />
          </div>
          <div className="bank-title">{bankTitle}</div>
        </div>

        <input
          className="card-number"
          type="number"
          placeholder="شماره کارت بانکی"
          value={userCardNumber}
          onChange={(e) => {
            setUserCardNumber(e.target.value);
          }}
        />

        <div className="card-holder">{user.username && user.lastname ? (user.firstname + "" + user.lastname) : user.username}</div>

        <button className="delete-card-btn" onClick={(e) => handleDeleteCard(e, cardId)}>
          حذف کارت
        </button>
      </div>
    </div>

  );
};

BankCard.propTypes = {
  bankLogo: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  cardHolder: PropTypes.string.isRequired,
};


export default BankCard;
