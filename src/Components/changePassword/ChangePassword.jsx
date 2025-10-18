import React, { useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, LockReset } from "@mui/icons-material";
import "./ChangePassword.css"
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
                `/api/users/${currentUser.id}/password`,
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
        <Paper className="change-password-container" elevation={3}>
            <Typography className="change-password-title">
                <LockReset className="lock-icon" />
                تغییر رمز عبور
            </Typography>

            <form onSubmit={handleSubmit} className="change-password-form">
                <div className="form-row">
                    <label htmlFor="currentPassword">رمز فعلی</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            name="currentPassword"
                            id="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                        <IconButton
                            type="button"
                            onClick={() => toggleShowPassword("current")}
                            className="visibility-btn"
                        >
                            {showPassword.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="newPassword">رمز جدید</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <IconButton
                            type="button"
                            onClick={() => toggleShowPassword("new")}
                            className="visibility-btn"
                        >
                            {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="confirmPassword">تکرار رمز جدید</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <IconButton
                            type="button"
                            onClick={() => toggleShowPassword("confirm")}
                            className="visibility-btn"
                        >
                            {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                </div>

                {error && <Typography className="error-text">{error}</Typography>}

                <Box className="submit-box">
                    <Button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "در حال تغییر..." : "تغییر رمز"}
                    </Button>
                </Box>
            </form>
        </Paper>

    );
};

export default ChangePassword;
