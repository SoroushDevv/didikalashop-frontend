import React, { useState } from "react";
import { Card, CardContent, CardActions, Typography, TextField, MenuItem, Button } from "@mui/material";
import "./EditAddressForm.css";

function EditAddressForm({ addressID, onSubmit, onCancel }) {
   const [formData, setFormData] = useState({
       province: '',
       city: '',
       street: '',
       postalCode: '',
       addressType: 'HOME',
     });
   
     // دیتای محلی برای استان‌ها و شهرها
     const provinces = [
       { id: '1', name: 'تهران' },
       { id: '2', name: 'اصفهان' },
       { id: '3', name: 'فارس' },
       { id: '4', name: 'خوزستان' },
       { id: '5', name: 'مازندران' },
       { id: '6', name: 'آذربایجان شرقی' },
       { id: '7', name: 'کرمان' },
       { id: '8', name: 'البرز' },
       { id: '9', name: 'گیلان' },
       { id: '10', name: 'خراسان رضوی' },
     ];
   
     const citiesData = {
       '1': [
         { id: '1-1', name: 'تهران' },
         { id: '1-2', name: 'ری' },
         { id: '1-3', name: 'شمیرانات' },
         { id: '1-4', name: 'اسلامشهر' },
         { id: '1-5', name: 'ورامین' },
         { id: '1-6', name: 'شهریار' },
         { id: '1-7', name: 'قدس' },
         { id: '1-8', name: 'پاکدشت' },
         { id: '1-9', name: 'ملارد' },
         { id: '1-10', name: 'فیروزکوه' },
       ],
       '2': [
         { id: '2-1', name: 'اصفهان' },
         { id: '2-2', name: 'کاشان' },
         { id: '2-3', name: 'نجف‌آباد' },
         { id: '2-4', name: 'خمینی‌شهر' },
         { id: '2-5', name: 'شاهین‌شهر' },
         { id: '2-6', name: 'فلاورجان' },
         { id: '2-7', name: 'زرین‌شهر' },
         { id: '2-8', name: 'سمیرم' },
         { id: '2-9', name: 'چادگان' },
         { id: '2-10', name: 'آران و بیدگل' },
       ],
       '3': [
         { id: '3-1', name: 'شیراز' },
         { id: '3-2', name: 'مرودشت' },
         { id: '3-3', name: 'کازرون' },
         { id: '3-4', name: 'لار' },
         { id: '3-5', name: 'فسا' },
         { id: '3-6', name: 'داراب' },
         { id: '3-7', name: 'جهرم' },
         { id: '3-8', name: 'سپیدان' },
         { id: '3-9', name: 'نی‌ریز' },
         { id: '3-10', name: 'اقلید' },
       ],
       '4': [
         { id: '4-1', name: 'اهواز' },
         { id: '4-2', name: 'دزفول' },
         { id: '4-3', name: 'آبادان' },
         { id: '4-4', name: 'خرمشهر' },
         { id: '4-5', name: 'شادگان' },
         { id: '4-6', name: 'ماهشهر' },
         { id: '4-7', name: 'شوش' },
         { id: '4-8', name: 'اندیمشک' },
         { id: '4-9', name: 'مسجدسلیمان' },
         { id: '4-10', name: 'ایذه' },
       ],
       '5': [
         { id: '5-1', name: 'ساری' },
         { id: '5-2', name: 'بابل' },
         { id: '5-3', name: 'آمل' },
         { id: '5-4', name: 'قائم‌شهر' },
         { id: '5-5', name: 'چالوس' },
         { id: '5-6', name: 'نوشهر' },
         { id: '5-7', name: 'بابلسر' },
         { id: '5-8', name: 'تنکابن' },
         { id: '5-9', name: 'محمودآباد' },
         { id: '5-10', name: 'رامسر' },
       ],
       '6': [
         { id: '6-1', name: 'تبریز' },
         { id: '6-2', name: 'مراغه' },
         { id: '6-3', name: 'مرند' },
         { id: '6-4', name: 'شبستر' },
         { id: '6-5', name: 'اهر' },
         { id: '6-6', name: 'سراب' },
         { id: '6-7', name: 'بستان‌آباد' },
         { id: '6-8', name: 'بناب' },
         { id: '6-9', name: 'ملکان' },
         { id: '6-10', name: 'اسکو' },
       ],
       '7': [
         { id: '7-1', name: 'کرمان' },
         { id: '7-2', name: 'رفسنجان' },
         { id: '7-3', name: 'جیرفت' },
         { id: '7-4', name: 'زرند' },
         { id: '7-5', name: 'بم' },
         { id: '7-6', name: 'بردسیر' },
         { id: '7-7', name: 'سیرجان' },
         { id: '7-8', name: 'کهنوج' },
         { id: '7-9', name: 'راور' },
         { id: '7-10', name: 'عنبرآباد' },
       ],
       '8': [
         { id: '8-1', name: 'کرج' },
         { id: '8-2', name: 'فردیس' },
         { id: '8-3', name: 'نظرآباد' },
         { id: '8-4', name: 'اشتهارد' },
         { id: '8-5', name: 'ماهدشت' },
         { id: '8-6', name: 'گرمدره' },
         { id: '8-7', name: 'کمال‌شهر' },
         { id: '8-8', name: 'چهارباغ' },
         { id: '8-9', name: 'محمدشهر' },
         { id: '8-10', name: 'تنکمان' },
       ],
       '9': [
         { id: '9-1', name: 'رشت' },
         { id: '9-2', name: 'لاهیجان' },
         { id: '9-3', name: 'لنگرود' },
         { id: '9-4', name: 'آستانه اشرفیه' },
         { id: '9-5', name: 'رودسر' },
         { id: '9-6', name: 'فومن' },
         { id: '9-7', name: 'صومعه‌سرا' },
         { id: '9-8', name: 'ماسال' },
         { id: '9-9', name: 'رضوانشهر' },
         { id: '9-10', name: 'تالش' },
       ],
       '10': [
         { id: '10-1', name: 'مشهد' },
         { id: '10-2', name: 'نیشابور' },
         { id: '10-3', name: 'سبزوار' },
         { id: '10-4', name: 'قوچان' },
         { id: '10-5', name: 'تربت‌حیدریه' },
         { id: '10-6', name: 'چناران' },
         { id: '10-7', name: 'کاشمر' },
         { id: '10-8', name: 'درگز' },
         { id: '10-9', name: 'فریمان' },
         { id: '10-10', name: 'خواف' },
       ],
     };

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
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

        onSubmit(addressID, formData);
    };

    return (
        <Card className="edit-address-card">
            <CardContent>
                <Typography variant="h5" className="edit-address-title" style={{ margin: "10px 0" }}>
                    ویرایش آدرس
                </Typography>

                <form className="edit-address-form" onSubmit={handleSubmit} noValidate>

                    <div className="edit-address-row-two-columns">
                          <TextField
                            placeholder="استان"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="edit-address-row-half"
                        />
                        <TextField
                            placeholder="شهر"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="edit-address-row-half"
                        />
                      
                        <TextField
                            placeholder="کد پستی"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className="edit-address-row-half"

                        />
                    </div>
                    <TextField
                        fullWidth
                        placeholder="آدرس"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    

                    <TextField
                        select
                        fullWidth
                        placeholder="نوع آدرس"
                        name="addressType"
                        className="edit-address-select"
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

            <CardActions className="edit-address-actions">
                <Button variant="outlined" color="secondary" className="cancel-changes-button" onClick={onCancel}>
                    انصراف
                </Button>
                <Button type="button" variant="contained" color="primary" className="submit-changes-button" onClick={handleSubmit}>
                    ذخیره تغییرات
                </Button>
            </CardActions>
        </Card>
    );
}

export default EditAddressForm;
