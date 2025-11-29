import React, { useState } from "react";

function AddNewAddress({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    addressType: "home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-[600px] w-[90%] p-5 mx-auto shadow-xl rounded-xl bg-white relative text-right font-vazir">
      <h2 className="text-center font-bold text-lg my-4">افزودن آدرس</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="آدرس"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
        />

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="شهر"
            required
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
          />

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="کد پستی"
            required
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
          />
        </div>

        <select
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c] bg-white"
        >
          <option value="home">منزل</option>
          <option value="work">محل کار</option>
          <option value="other">سایر</option>
        </select>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#fa256c] text-white rounded-md hover:bg-[#e01f5e] transition"
          >
            ذخیره آدرس
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewAddress;
