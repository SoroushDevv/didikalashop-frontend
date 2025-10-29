import { useState } from "react";
import api from "../../../api/axios";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Box
} from "@mui/material";
import { getAuthToken } from "../../../Utils/AuthUtils";
import ShowSwal from "../../ShowSwal/ShowSwal";
import "./EditInfoModal.css"



export default function IdentityForm({ user, onClose, onUpdate }) {
    const token = getAuthToken();

    const [name, setName] = useState(user?.firstname || "");
    const [lastName, setLastName] = useState(user?.lastname || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
    const [city, setCity] = useState(user?.city || "")

    const [email, setEmail] = useState(user?.email || "")





    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        try {
            const res = await api.patch(
                `/api/users/${user.id}`,
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
                console.log("Update response:", res.data);
            }

        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            alert(" خطا در بروزرسانی اطلاعات");
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div onClick={(e) => e.stopPropagation()}>
                <Card
                    sx={{
                        maxWidth: 600,
                        margin: "20px auto",
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 3,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            لطفا اطلاعات شناسایی خود را وارد کنید.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            نام و نام خانوادگی شما باید با اطلاعاتی که وارد می‌کنید
                            همخوانی داشته باشند.
                        </Typography>

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                            gap={2}
                            mb={2}
                        >
                            <TextField
                                label="نام"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value.trim())}
                                required
                            />
                            <TextField
                                label="نام خانوادگی"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value.trim())}
                                required
                            />
                        </Box>

                        <Box mb={3}>
                            <TextField
                                label="شماره تماس"
                                fullWidth
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.trim())}
                                required
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                label="ایمیل"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Box>

                        <Box mb={3}>

                            <TextField
                                label="شهر"
                                select
                                fullWidth
                                variant="outlined"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="city-input-select"
                                required
                            >

                                <MenuItem value="تهران">تهران</MenuItem>
                                <MenuItem value="مشهد">مشهد</MenuItem>
                                <MenuItem value="اصفهان">اصفهان</MenuItem>
                                <MenuItem value="شیراز">شیراز</MenuItem>
                                <MenuItem value="تبریز">تبریز</MenuItem>

                            </TextField>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={handleUpdateInfo}
                        >
                            آپدیت اطلاعات
                        </Button>
                    </CardContent>
                </Card>

            </div>

        </div>

    );
}
