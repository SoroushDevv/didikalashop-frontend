import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ShowSwal from '../ShowSwal/ShowSwal';
import { useCurrentUser } from '../../Hooks/useCurrentUser';
import api from '../../api/axios';
import { getAuthToken } from '../../Utils/AuthUtils';


const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const AddressFormModal = ({ isOpen, onClose, onSave ,editingAddress}) => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [error, setError] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [isReady, setIsReady] = useState(false)
  const [cities, setCities] = useState([])

  const [formData, setFormData] = useState({
    province: '',
    city: '',
    street: '',
    postalCode: '',
    addressType: 'HOME',
  });

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
    if (!isOpen) return;

   if(editingAddress?.id) {
       setFormData(editingAddress)
       setIsReady(true)
       return;
   }

    const fetchAddress = async () => {
      setLoadingFetch(true);
      try {
        const token = getAuthToken();
        if (!token) throw new Error('توکن یافت نشد، لطفاً دوباره وارد شوید');

        const { data } = await api.get('/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.length) {
          const addr = data[0];
          
          const parts = addr.address.split(" - ").slice(2).join(" - ");
          
          setFormData({
            province: addr.province,
            city: addr.city || '',
            street: parts || '',
            postalCode: addr.postalCode || '',
            addressType: addr.addressType || 'HOME',
          });
        } else {
          setIsReady(true)
          return;
        }
      } catch (err) {
        const msg =
          err.response?.status === 401
            ? 'توکن نامعتبر است، لطفاً دوباره وارد شوید'
            : err.response?.data?.error || err.message || 'خطای ناشناخته';
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
  }, [isOpen, currentUser?.id, navigate, editingAddress]);

  useEffect(() => {
    const selectedProvince = provinces.find(
      (p) => p.name === formData.province
    );
    setCities(selectedProvince ? citiesData[selectedProvince.id] || [] : []);
  }, [formData.province]);

  if (!isOpen) return null;
  
  if (!isReady || loadingFetch) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>,
      document.getElementById('modal')
    );
  }

  const isFormValid = () =>
    formData.province &&
    formData.city &&
    formData.street &&
    /^\d{10}$/.test(formData.postalCode) &&
    ['HOME', 'WORK', 'OTHER'].includes(formData.addressType);

  const handleChange = (e) => {
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
      const msg = 'لطفاً همه فیلدها را به درستی پر کنید (کد پستی باید ۱۰ رقمی باشد).';
      setError(msg);
      ShowSwal({ icon: 'error', title: msg });
      onSave?.({ error: msg, isSuccess: false });
      return;
    }


    const provinceName = provinces.find((p) => p.name === formData.province)?.name;

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

      let res;
      if (editingAddress && editingAddress.id) {
        res = await api.put(
          `/addresses/${editingAddress.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data

        if (res.status) {
          ShowSwal({
            title: "موفقیت",
            text: "آدرس با موفقیت بروزرسانی شد",
            icon: "success",
            onConfirm: () => {
              onSave?.({
                ...payload,
                id: editingAddress.id,
                isSuccess: true,
              });
            }
          });
        }

      } else {
        res = await api.post('/addresses', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data

        if (res.status) {
          ShowSwal({
            title: "موفقیت",
            text: "آدرس با موفقیت افزوده شد",
            icon: "success",
            onConfirm: () => {
              onSave?.({
                ...payload,
                id: data.addressID, 
                isSuccess: true,
              });
            }
          });
        }
      }
      onClose();
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? 'توکن نامعتبر است، لطفاً دوباره وارد شوید'
          : err.response?.data?.error || err.message || 'خطا در ثبت آدرس';
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      dir="rtl"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 p-1 rounded-full transition"
          aria-label="بستن"
        >
          <CloseIcon />
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 pb-3 mb-4 border-b">
          {editingAddress ? 'بروزرسانی آدرس موجود' : 'افزودن آدرس جدید'}
        </h2>
        
        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="relative">
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full px-3 pt-5 pb-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="" disabled>انتخاب کنید</option>
              {provinces && provinces.length > 0 ? (
                provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))
              ) : (
                <option disabled>هیچ استانی یافت نشد</option>
              )}
            </select>
            <label className="absolute top-1 right-3 text-xs text-gray-500 pointer-events-none transition-all transform origin-top-right">
              استان
            </label>
          </div>

          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={!formData.province}
              className={`w-full px-3 pt-5 pb-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none ${!formData.province ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
              <option value="" disabled>انتخاب کنید</option>
              {cities && cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option disabled>
                  {!formData.province ? 'ابتدا استان را انتخاب کنید' : 'هیچ شهری یافت نشد'}
                </option>
              )}
            </select>
            <label className="absolute top-1 right-3 text-xs text-gray-500 pointer-events-none transition-all transform origin-top-right">
              شهر
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              label="خیابان"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full px-3 pt-5 pb-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 peer"
              placeholder=" "
            />
            <label className="absolute top-1 right-3 text-xs text-gray-500 pointer-events-none transition-all transform origin-top-right">
              خیابان و جزئیات آدرس
            </label>
          </div>
          
          <div className="relative">
            <input
              type="text"
              label="کد پستی"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              maxLength={10}
              pattern="\d{10}"
              title="کد پستی باید 10 رقمی باشد"
              className="w-full px-3 pt-5 pb-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 peer"
              placeholder=" "
            />
            <label className="absolute top-1 right-3 text-xs text-gray-500 pointer-events-none transition-all transform origin-top-right">
              کد پستی (۱۰ رقمی)
            </label>
          </div>
          
          <div className="relative">
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              required
              className="w-full px-3 pt-5 pb-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="HOME">خانه</option>
              <option value="WORK">محل کار</option>
              <option value="OTHER">سایر</option>
            </select>
            <label className="absolute top-1 right-3 text-xs text-gray-500 pointer-events-none transition-all transform origin-top-right">
              نوع آدرس
            </label>
          </div>


          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold rounded-lg shadow-md transition duration-200 
              ${isFormValid() && !loadingSubmit
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" 
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`
            }
            disabled={!isFormValid() || loadingSubmit}
          >
            {loadingSubmit ? (
              <svg className="animate-spin h-5 w-5 text-white inline-block mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              editingAddress ? 'تأیید آدرس' : 'ثبت آدرس'
            )}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default AddressFormModal;