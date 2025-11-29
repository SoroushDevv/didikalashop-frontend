import React, { useState, useEffect } from "react";
import Portal from "../../Portal/Portal"; 
import CloseIcon from '@mui/icons-material/Close';

export default function EditUserInfoModal({ isOpen, submitModal, closeModal }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (e.code === "Escape") {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitModal(formData); 
    closeModal(); 
  };

  return (
    <Portal>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-[1000] flex justify-center items-center transition-opacity duration-300"
          dir="rtl"
          onClick={closeModal} 
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 relative transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته‌شدن با کلیک درون مدال
          >
            <button 
              className="absolute top-4 left-4 p-1 text-gray-400 hover:text-gray-700 transition"
              onClick={closeModal}
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            
            <div className="pt-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">ویرایش اطلاعات </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">نام کاربری:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">رمز عبور:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">شماره تلفن:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">ایمیل:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

          <button
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-6"
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