import React, { useState, useEffect } from "react";
import Portal from "../../Portal/Portal"; // پورتال شما
import "./EditUserInfoModal.css";
import CloseIcon from '@mui/icons-material/Close';
export default function EditUserInfoModal({ isOpen, submitModal, closeModal }) {
  // مدیریت حالت‌های فرم
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (e.code === "Escape") {
        console.log("escape key pressed");
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleCloseModal);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, [isOpen, closeModal]);

  // مدیریت تغییرات ورودی‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // مدیریت ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    submitModal(formData); // ارسال داده‌های فرم به تابع submitModal
    closeModal(); // بستن مدال پس از ارسال
  };

  return (
    <Portal>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-box edit-user-modal active">
            <div className="close-icon" onClick={e => closeModal()}>
            <CloseIcon />
            </div>
            <div className="edit-modal-container">
              <h1>ویرایش اطلاعات </h1>
              <form className="edit-modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">نام کاربری:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">رمز عبور:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">شماره تلفن:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">ایمیل:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <button
                  className="edit-modal-submit modal-button"
                  type="submit"
                >
                  ذخیره اطلاعات
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
}