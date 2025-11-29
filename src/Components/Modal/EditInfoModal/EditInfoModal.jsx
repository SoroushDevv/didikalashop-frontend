import { useState } from "react";
import api from "../../../api/axios";
import { getAuthToken } from "../../../Utils/AuthUtils";
import ShowSwal from "../../ShowSwal/ShowSwal";

export default function IdentityForm({ user, onClose, onUpdate }) {
    const token = getAuthToken();

    const [name, setName] = useState(user?.firstname || "");
    const [lastName, setLastName] = useState(user?.lastname || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
    const [city, setCity] = useState(user?.city || "")
    const [email, setEmail] = useState(user?.email || "")

    const availableCities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"];

    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        try {
            const res = await api.patch(
                `/users/${user.id}`,
                {
                    firstname: name,
                    lastname: lastName,
                    phone: phoneNumber,
                    city: city,
                    email: email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status === 200 || res.status === 201) {
                ShowSwal({
                    title: "با موفقیت اطلاعات اپدیت شد", text: "", icon: "success", showConfirmButton: true, onConfirm: () => {
                        onUpdate()
                        onClose()
                    }
                })
            }

        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            alert(" خطا در بروزرسانی اطلاعات");
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center"
            dir="rtl"
        >
            <div onClick={(e) => e.stopPropagation()} className="max-w-xl w-full p-4">
                
                <div
                    className="bg-white rounded-xl shadow-2xl p-6 md:p-8"
                >
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">
                            لطفا اطلاعات شناسایی خود را وارد کنید.
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            نام و نام خانوادگی شما باید با اطلاعاتی که وارد می‌کنید
                            همخوانی داشته باشند.
                        </p>

                        <form onSubmit={handleUpdateInfo}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                
                                <input
                                    type="text"
                                    placeholder="نام"
                                    value={name}
                                    onChange={(e) => setName(e.target.value.trim())}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                                
                                <input
                                    type="text"
                                    placeholder="نام خانوادگی"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value.trim())}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="tel"
                                    placeholder="شماره تماس"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.trim())}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="ایمیل"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="mb-6">
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                                >
                                    <option value="" disabled>شهر را انتخاب کنید</option>
                                    {availableCities.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                آپدیت اطلاعات
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}