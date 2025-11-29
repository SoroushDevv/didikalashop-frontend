import React, { useState } from "react";

function EditAddressForm({ addressID, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    street: "",
    postalCode: "",
    addressType: "HOME",
  });

  const provinces = [
    { id: "1", name: "تهران" },
    { id: "2", name: "اصفهان" },
    { id: "3", name: "فارس" },
    { id: "4", name: "خوزستان" },
    { id: "5", name: "مازندران" },
    { id: "6", name: "آذربایجان شرقی" },
    { id: "7", name: "کرمان" },
    { id: "8", name: "البرز" },
    { id: "9", name: "گیلان" },
    { id: "10", name: "خراسان رضوی" },
  ];

  const [citiesData, setCitiesData] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(addressID, formData);
  };

  return (
    <div className="max-w-[600px] w-[90%] p-5 mx-auto shadow-xl rounded-xl bg-white relative text-right font-vazir">
      <h2 className="text-center font-bold text-lg my-4">ویرایش آدرس</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c] bg-white"
          >
            <option value="">انتخاب استان</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="شهر"
            required
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
          />
        </div>

        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="کد پستی"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
        />

        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="آدرس کامل"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c]"
        />

        <select
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#fa256c] bg-white"
        >
          <option value="HOME">منزل</option>
          <option value="WORK">محل کار</option>
          <option value="OTHER">سایر</option>
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
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAddressForm;
