import React, { useState } from "react";
import { Card, CardContent, CardActions, Typography, TextField, MenuItem, Button } from "@mui/material";
import "./AddNewAddress.css";

function AddNewAddress({ addressID, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        postalCode: "",
        addressType: "home",
    });

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [selectValue, setSelectValue] = useState("home")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        onSubmit(formData);
    };

    return (
        <Card className="add-address-card">
            <CardContent>
                <Typography variant="h5" className="add-address-title" style={{ margin: "10px 0" }}>
                    افزودن آدرس
                </Typography>

                <form className="add-address-form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        placeholder="آدرس"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <div className="add-address-row-two-columns">
                        <TextField
                            placeholder="شهر"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="add-address-row-half"
                        />

                        <TextField
                            placeholder="کد پستی"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className="add-address-row-half"

                        />
                    </div>

                    <TextField
                        select
                        fullWidth
                        placeholder="نوع آدرس"
                        name="addressType"
                        className="add-address-select"
                        value={formData.addressType}
                        onChange={handleChange}
                        style={{ paddingRight: "15px !important" }}
                    >
                        <MenuItem value="home" >منزل</MenuItem>
                        <MenuItem value="work" >محل کار</MenuItem>
                        <MenuItem value="other" >سایر</MenuItem>
                    </TextField>
                </form>
            </CardContent>

            <CardActions className="add-address-actions">
                <Button variant="outlined" color="secondary" className="cancel-changes-button" onClick={onCancel}>
                    انصراف
                </Button>
                <Button type="button" variant="contained" color="primary" className="submit-changes-button" onClick={handleSubmit}>
                    ذخیره ادرس
                </Button>
            </CardActions>
        </Card>
    );
}

export default AddNewAddress;
