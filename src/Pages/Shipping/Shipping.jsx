import React, { useEffect, useState } from 'react'
import "./Shipping.css"
import { useCurrentUser } from "../../Hooks/useCurrentUser"
import apiUtils from "../../Utils/ApiUtils"
import CheckoutTimes from './Components/CheckoutTimes/CheckoutTimes'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { styled, Button, Box } from '@mui/material'
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary'
import AddIcon from '@mui/icons-material/Add';
import AddressFormModal from '../../Components/Portal/changeAddressModal'
import ShowSwal from '../../Components/ShowSwal/ShowSwal'
import axios from 'axios'
import { getAuthToken } from '../../Utils/AuthUtils'

const StyledButton = styled(Button)(({ theme }) => ({
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: '4px',
    fontWeight: 'bold',
    '&:hover': {
        borderBottom: `2px solid ${theme.palette.primary.dark}`,
    },
}));


export default function Shipping() {
    const { currentUser, loading, error } = useCurrentUser()
    const [localCart, setLocalCart] = useState()
    const [userAddresses, setUserAddresses] = useState([])
    const [newAddress, setNewAddress] = useState("")
    const [newPostalCode, setNewPostalCode] = useState(null)
    const [shippingMethod, setShippingMethod] = useState("normal")
    const [isInvoiceRequired, setIsInvoiceRequired] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [trigger, setTrigger] = useState(0)
    const [fetchLoading, setFetchLoading] = useState(false)





    useEffect(() => {
        const getLocalOrders = () => {
            try {
                const cart = localStorage.getItem("orders");
                if (cart) {
                    setLocalCart(JSON.parse(cart));
                } else {
                    setLocalCart([]);
                }
            } catch (err) {
                console.error("خطا در بارگذاری سبد خرید:", err);
                setLocalCart([]);
            }
        };
        getLocalOrders();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        console.log("current user : ", currentUser)
        const token = getAuthToken();

        const fetchUserAddresses = async () => {


            try {
                setFetchLoading(true)

                const response = await axios.get("http://localhost:8000/api/addresses", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("userAddresses", response)

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    console.log("response.data", response.data[0])
                    // ست کردن همه آدرس‌ها
                    setUserAddresses(response.data.map(addr => ({
                        id: addr.id,
                        address: addr.address,
                        city: addr.city,
                        postalCode: addr.postalCode,
                        addressType: addr.addressType
                    })));
                } else {
                    setUserAddresses([]); // اگر کاربر آدرس ندارد
                }

            } catch (err) {
                console.error("Error fetching addresses:", err);
                setUserAddresses([]);
            } finally {
                setFetchLoading(false)
            }
        }

        fetchUserAddresses();

    }, [isModalOpen, loading, currentUser]);

    const handleSaveAddress = (addressData) => {

        setNewAddress(addressData.fullAddress)
        setNewPostalCode(addressData.postalCode)
        ShowSwal({ title: "ادرس با موفقیت اپدیت شد", text: "", icon: "success", showCancelButton: false, showCancelButton: false })

    }

    if (loading) {
        return <div>در حال بارگذاری اطلاعات کاربر...</div>;
    }

    if (error) {
        return <div>خطا: {error}</div>;
    }

    if (!currentUser) {
        return <div>کاربری یافت نشد. لطفاً دوباره وارد شوید.</div>;
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }



    console.log("user addresses : ", userAddresses)
console.log("use current user :", currentUser)
    return (
        <div className='container'>
            <div className="shipping-section">
                <div className="shipping-content">
                    <div className="section-title shipping-section-title">
                        <h3>انتخاب آدرس تحویل سفارش</h3>
                    </div>

                    <div className="address-section">
                        <div className="modal add-address-modal" id="add-address-modal">
                            <div className="modal-dialog modal-lg modal-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <span className="close-button modal-close" onClick={() => setIsModalOpen(false)}>
                                            <i className="icon-location"></i> بستن
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="checkout-contact">
                            <ul className="contact-list">
                                <li>
                                    گیرنده:
                                    <span className="contact-name">{currentUser.firstname} {currentUser.lastname}</span>
                                </li>
                                <li>
                                    شماره تماس: <span className="contact-phone">{currentUser.phone}</span><br />
                                    کد پستی: <span className="contact-postal">
                                        {userAddresses?.length > 0 ? userAddresses[0].postalCode : "--"}
                                    </span><br />
                                    آدرس: <span className="contact-address">
                                        {userAddresses?.length > 0 ? userAddresses[0].address : "آدرس یافت نشد"}
                                    </span>
                                </li>
                            </ul>
                            <div className="add-address-btn">
                                <Button onClick={() => setIsModalOpen(true)}>
                                    <span>افزودن آدرس جدید</span>
                                    <AddIcon className="add-icon" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <form className="shipping-form">
                        <div className="shipping-methods-title shipping-title">
                            <h3>انتخاب نحوه ارسال</h3>
                        </div>
                        <div className="shipping-methods">
                            <div className="radio-option shipping-radio-option">
                                <input type="radio" name="shipping" id="normal-shipping" value="normal"
                                    onChange={(e) => {
                                        localStorage.setItem("shippingMethod", e.target.value)
                                        setShippingMethod(e.target.value)
                                    }} />
                                <label htmlFor="normal-shipping">عادی</label>
                            </div>
                            <div className="radio-option shipping-radio-option">
                                <input type="radio" name="shipping" id="express-shipping" value="express"
                                    onChange={(e) => {
                                        localStorage.setItem("shippingMethod", e.target.value)
                                        setShippingMethod(e.target.value)
                                    }} />
                                <label htmlFor="express-shipping">اکسپرس</label>
                            </div>
                        </div>

                        <div className="shipping-products-title shipping-title">
                            <h2>محصولات ارسالی</h2>
                        </div>

                        <div className="checkout-products">
                            {localCart?.map((item, indx) => (
                                <div key={indx} className="product-item shipping-product-item">
                                    <img src={`/img/products/${item.product.img}`} alt={item.product.title} />
                                    <div className="product-info">
                                        <h3 className="product-title">{item.product.title}</h3>
                                        <p className="product-desc">{item.product.productDesc}</p>
                                        <div className="product-price"> ... </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <CheckoutTimes />

                        <div className="invoice-section shipping-invoice">
                            <div className="section-title"><h2>صدور فاکتور</h2></div>
                            <div className="invoice-option">
                                <input type="checkbox" />
                                <label>درخواست ارسال فاکتور خرید</label>
                            </div>
                        </div>
                    </form>

                    <Box className="shipping-actions">
                        <StyledButton href="/payment" startIcon={<ChevronRightOutlinedIcon />}>
                            تأیید و ادامه ثبت سفارش
                        </StyledButton>
                        <StyledButton href="/cart" endIcon={<ChevronLeftOutlinedIcon />}>
                            بازگشت به سبد خرید
                        </StyledButton>
                    </Box>
                </div>


                <div className="checkout-sidebar">
                    <CheckoutSummary submitButtonTitle='تایید و ادامه' submitButtonURL='/payment' />
                </div>
                {isModalOpen && <AddressFormModal isOpen={isModalOpen} onSave={handleSaveAddress} onClose={handleCloseModal} />}
            </div>
        </div>
    )
}
