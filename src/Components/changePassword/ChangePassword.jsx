import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff, LockReset } from '@mui/icons-material';
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import { getAuthToken } from "../../Utils/AuthUtils";
import ShowSwal from "../ShowSwal/ShowSwal";

const ChangePassword = ({ userID, token, onSuccess }) => {
    const Navigate = useNavigate()

    const { currentUser } = useCurrentUser()
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const token = getAuthToken()
        if (formData.newPassword.length < 6) {
            setError("رمز جدید باید حداقل ۶ کاراکتر باشد.");
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError("رمز جدید و تکرار آن یکسان نیستند.");
            return;
        }

        try {
            setLoading(true);
            const res = await api.put(
                `/users/${currentUser.id}/password`,
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (onSuccess) onSuccess(res.data);
            ShowSwal({title:"تغییر رمز با موفقیت انجام شد",text:"",icon:"success",showConfirmButton:true,confirmButtonText:"حله",onConfirm:(() => {Navigate("/profile")})})
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error || "خطا در تغییر رمز عبور. دوباره تلاش کنید."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl mt-10 border border-gray-200" dir="rtl">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <LockReset className="w-6 h-6 ml-2 text-indigo-600" />
                تغییر رمز عبور
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">رمز فعلی</label>
                    <div className="relative">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            name="currentPassword"
                            id="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <button
                            type="button"
                            onClick={() => toggleShowPassword("current")}
                            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-600 hover:text-indigo-600 transition"
                        >
                            {showPassword.current ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">رمز جدید</label>
                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <button
                            type="button"
                            onClick={() => toggleShowPassword("new")}
                            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-600 hover:text-indigo-600 transition"
                        >
                            {showPassword.new ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">تکرار رمز جدید</label>
                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <button
                            type="button"
                            onClick={() => toggleShowPassword("confirm")}
                            className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-600 hover:text-indigo-600 transition"
                        >
                            {showPassword.confirm ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                        }`}
                    >
                        {loading ? "در حال تغییر..." : "تغییر رمز"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;