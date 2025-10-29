import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShowSwal from '../ShowSwal/ShowSwal';
import { useCurrentUser } from '../../Hooks/useCurrentUser';
import api from '../../api/axios';
import { getAuthToken } from '../../Utils/AuthUtils';




const AddressFormModal = ({ isOpen, onClose, onSave ,editingAddress}) => {
  const { currentUser } = useCurrentUser();
  const [error, setError] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  // const [existingAddress, setExistingAddress] = useState([]);
  const [isReady, setIsReady] = useState(false)

  const navigate = useNavigate();

  const [cities, setCities] = useState([])

  const [formData, setFormData] = useState({
    province: '',
    city: '',
    street: '',
    postalCode: '',
    addressType: 'HOME',
  });

  console.log("edditing address :" , editingAddress)
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


  useEffect(() => {
   if(editingAddress) {
    setFormData(editingAddress)
   }
  },[])

  
  useEffect(() => {
    if (!isOpen || !currentUser?.id) {
      setIsReady(false);
      return;
    }

    const fetchAddress = async () => {
      setLoadingFetch(true);
      try {
        const token = getAuthToken();
        if (!token) throw new Error('توکن یافت نشد، لطفاً دوباره وارد شوید');

        const { data } = await api.get('/api/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.length) {
          const addr = data[0];
          setFormData({
            province: addr.province,
            city: addr.city || '',
            street: addr.address.split(' - ')[2] || '',
            postalCode: addr.postalCode || '',
            addressType: addr.addressType || 'HOME',
          });
        }
      } catch (err) {
        console.error('خطا در دریافت آدرس:', err);
        const msg =
          err.response?.status === 401
            ? 'توکن نامعتبر است، لطفاً دوباره وارد شوید'
            : err.response?.data?.error || err.message;
        setError(msg);
        ShowSwal({ icon: 'error', title: msg });
        if (err.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } finally {
        setLoadingFetch(false);
        setIsReady(true);
      }
    };

    fetchAddress();
  }, [isOpen, currentUser?.id, navigate]);

  // --- Update Cities when province changes ---
  useEffect(() => {
    const selectedProvince = provinces.find(
      (p) => p.name === formData.province
    );
    setCities(selectedProvince ? citiesData[selectedProvince.id] || [] : []);
  }, [formData.province]);

  if (!isOpen) return null;
  if (!isReady || loadingFetch) {
    return ReactDOM.createPortal(
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>,
      document.getElementById('modal')
    );
  }

  const isFormValid = () =>
    formData.province &&
    formData.city &&
    formData.street.trim() &&
    /^\d{10}$/.test(formData.postalCode) &&
    ['HOME', 'WORK', 'OTHER'].includes(formData.addressType);

  const handleChange = (e) => {
    console.log("e target" , e.target)
    console.log("form data:", formData)
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'province' ? { city: '' } : {}),
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid()) {
      const msg = 'لطفاً همه فیلدها را به درستی پر کنید';
      setError(msg);
      ShowSwal({ icon: 'error', title: msg });
      onSave?.({ error: msg, isSuccess: false });
      return;
    }


    const provinceName = provinces.find((p) => p.name === formData.province)?.name;

    console.log(provinceName)

    if (!provinceName) {
      const msg = 'استان انتخاب‌شده نامعتبر است';
      setError(msg);
      ShowSwal({ icon: 'error', title: msg });
      onSave?.({ error: msg, isSuccess: false });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      const msg = 'توکن یافت نشد، لطفاً دوباره وارد شوید';
      setError(msg);
      ShowSwal({ icon: 'error', title: msg });
      navigate('/login');
      return;
    }

    setLoadingSubmit(true);

    const payload = {
      province: provinceName,
      address: `${provinceName} - ${formData.city} - ${formData.street}`,
      city: formData.city,
      postalCode: formData.postalCode,
      addressType: formData.addressType,
    };

    try {

      console.log("editing Address : ", editingAddress)
      let res;
      if (editingAddress && editingAddress.id) {
        res = await api.put(
          `/api/addresses/${editingAddress.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data

        if (res.status) {
          ShowSwal({
            title: "موفقیت",
            text: "آدرس با موفقیت بروزرسانی  شد",
            icon: "success",
            onConfirm: () => {
              onSave?.({
                ...payload,
                addressID: editingAddress ? editingAddress.id : data.addressID,
                isSuccess: true,
              });
            }
          });
        }

      } else {
        res = await api.post('/api/addresses', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data

        if (res.status) {
          ShowSwal({
            title: "موفقیت",
            text: "آدرس با موفقیت افزوده  شد",
            icon: "success",
            onConfirm: () => {
              onSave?.({
                ...payload,
                addressID: editingAddress ? editingAddress.id : data.addressID,
                isSuccess: true,
              });
            }
          });
        }
      }




      onClose();
    } catch (err) {
      console.error('خطا در ثبت آدرس:', err);
      const msg =
        err.response?.status === 401
          ? 'توکن نامعتبر است، لطفاً دوباره وارد شوید'
          : err.response?.data?.error || err.message;
      setError(msg);
      ShowSwal({ icon: 'error', title: msg });
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
      onSave?.({ error: msg, isSuccess: false });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: '90%', sm: 400 },
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          aria-label="بستن"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" padding={"10px"} borderBottom={"1px solid #1e1e1e"} gutterBottom>
          {editingAddress ? 'بروزرسانی ادرس موجود' : 'افزودن آدرس جدید'}
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {loadingFetch ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>استان</InputLabel>
              <Select
                name="province"
                value={formData.province}
                onChange={handleChange}
                label="استان"
              >
                {provinces && provinces.length > 0 ? (
                  provinces.map((province) => (
                    <MenuItem key={province.id} value={province.name}>
                      {province.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>هیچ استانی یافت نشد</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required disabled={!formData.province}>
              <InputLabel>شهر</InputLabel>
              <Select
                name="city"
                value={formData.city}
                onChange={handleChange}
                label="شهر"
              >
                {cities && cities.length > 0 ? (
                  cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>هیچ شهری یافت نشد</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="خیابان"
              name="street"
              value={formData.street}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="کد پستی"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              margin="normal"
              required
              inputProps={{ pattern: '\\d{10}', title: 'کد پستی باید 10 رقمی باشد' }}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>نوع آدرس</InputLabel>
              <Select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                label="نوع آدرس"
              >
                <MenuItem value="HOME">خانه</MenuItem>
                <MenuItem value="WORK">محل کار</MenuItem>
                <MenuItem value="OTHER">سایر</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!isFormValid() || loadingSubmit}
            >
              {loadingSubmit ? <CircularProgress size={20} /> : editingAddress ? 'تأیید آدرس' : 'ثبت آدرس'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>,
    document.getElementById('modal')
  );
};

export default AddressFormModal;