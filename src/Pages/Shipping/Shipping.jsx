import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Shipping.css"
import { useCurrentUser } from "../../Hooks/useCurrentUser"
import CheckoutTimes from './Components/CheckoutTimes/CheckoutTimes'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { styled, Button, Box } from '@mui/material'
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary'
import AddIcon from '@mui/icons-material/Add';
import AddressFormModal from '../../Components/Portal/AddressFormModal'
import ShowSwal from '../../Components/ShowSwal/ShowSwal'
import api from '../../api/axios'
import { getAuthToken } from '../../Utils/AuthUtils'
import { useCart } from '../../Contexts/CartContext';
import Loader from '../../Components/Loader/Loader'

const StyledButton = styled(Button)(({ theme }) => ({
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: '4px',
    fontWeight: 'bold',
    '&:hover': {
        borderBottom: `2px solid ${theme.palette.primary.dark}`,
    },
}));


export default function Shipping() {
    const Navigate = useNavigate()
    const {order} = useCart()
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
    const [localAddress, setLocalAddress] = useState(null)

    useEffect(() => {

        if (order.items.length === 0) {
            Navigate("/")
        }
    }, [order])

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

        const token = getAuthToken();

        const fetchUserAddresses = async () => {


            try {
                setFetchLoading(true)

                const response = await api.get("/addresses", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setUserAddresses(response.data.map(addr => ({
                        id: addr.id,
                        address: addr.address,
                        city: addr.city,
                        postalCode: addr.postalCode,
                        addressType: addr.addressType
                    })));
                } else {
                    setUserAddresses([]);
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
        return <Loader/>;
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

    const handleSelectNewAddress = (value) => {
        localStorage.setItem("shippingAddress", JSON.stringify(value))
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col justify-between md:flex-row  w-full gap-5">

                <div className="basis-full md:basis-3/4 max-w-full lg:max-w-[1200px] w-full mx-0 p-6 bg-white rounded-lg shadow-xl">

                    <div className="mb-6 bg-white border border-solid border-gray-200 rounded-lg p-6 shadow-sm">

                        <div className="mb-4 border-b border-solid border-gray-300 pb-3 text-xl">
                            <h3 className="font-bold">انتخاب آدرس تحویل سفارش</h3>
                        </div>

                        <div className="mt-4">
                            <ul className="list-none p-0 mx-0 mt-4 mb-4 space-y-2">
                                <li className="font-bold text-lg flex items-center">
                                    گیرنده:
                                    <span className="font-semibold mr-2 text-base text-gray-700">
                                        {currentUser.firstname} {currentUser.lastname}
                                    </span>
                                </li>
                                <li className="font-bold text-lg flex items-center">
                                    شماره تماس:
                                    <span className="font-semibold mr-2 text-base text-gray-700">
                                        {currentUser.phone}
                                    </span>
                                </li>
                                <li className="font-bold text-lg flex items-center">
                                    کد پستی:
                                    <span className="font-semibold mr-2 text-base text-gray-700">
                                        {userAddresses?.length > 0 ? userAddresses[0].postalCode : "--"}
                                    </span>
                                </li>
                                <li className="font-bold text-lg flex flex-col sm:flex-row sm:items-center">
                                    <label for="address" className="mb-2 sm:mb-0 sm:mr-4">ادرس مورد نظر انتخاب کنید:</label>
                                    <select id="address" name="address"
                                        className="user-addresses border border-gray-300 rounded-lg p-2 text-base text-gray-800 
                                       focus:ring-blue-500 focus:border-blue-500 transition duration-150 flex-grow"
                                        onchange="(event) => handleSelectNewAddress(event.target.value)">

                                        {userAddresses && userAddresses.map((address) => (
                                            <option key={address.id} value={address.address} className='contact-address font-semibold text-base text-gray-600 p-2'>
                                                {address.address}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                            </ul>

                            <div className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 px-4 inline-block shadow-lg transition duration-200">
                                <button onClick={() => {
                                    setIsModalOpen(true)
                                }}
                                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse 
                                   w-full h-full text-base font-medium focus:outline-none">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                    <span>افزودن آدرس جدید</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <form className="bg-white border border-solid border-gray-200 rounded-lg p-6 shadow-sm mb-6">

                        <div className="mb-4 border-b border-solid border-gray-300 pb-3 text-xl">
                            <h3 className="font-bold">انتخاب نحوه ارسال</h3>
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">

                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    id="normal-shipping"
                                    value="normal"
                                    checked={shippingMethod === "normal"}
                                    onChange={(e) => {
                                        localStorage.setItem("shippingMethod", e.target.value);
                                        setShippingMethod(e.target.value);
                                    }}
                                    className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300"
                                />

                                <label
                                    htmlFor="normal-shipping"
                                    className="m-2 text-gray-700 text-lg font-medium"
                                >
                                    عادی
                                </label>
                            </div>

                            <div className="flex items-center space-x-2 rtl:space-x-reverse">

                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    id="express-shipping"
                                    value="express"
                                    checked={shippingMethod === "express"}
                                    onChange={(e) => {
                                        localStorage.setItem("shippingMethod", e.target.value);
                                        setShippingMethod(e.target.value);
                                    }}
                                    className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300"
                                />

                                <label
                                    htmlFor="express-shipping"
                                    className="m-2 text-gray-700 text-lg font-medium"
                                >
                                    اکسپرس
                                </label>
                            </div>
                        </div>



                        <CheckoutTimes />

                        <hr className="my-6 border-gray-200" />

                        <div className="invoice-section shipping-invoice mt-6">
                            <div className="section-title mb-3">
                                <h2 className="text-xl font-bold">صدور فاکتور</h2>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                                <label className="text-gray-700">درخواست ارسال فاکتور خرید</label>
                            </div>
                        </div>
                    </form>

                    <div className="flex justify-between mt-8 p-4 bg-gray-50 rounded-lg">
                        <a href="/payment" className="flex items-center space-x-2 rtl:space-x-reverse 
                            bg-blue-600 hover:bg-blue-700 text-white font-bold 
                            py-3 px-6 rounded-xl transition duration-300 ease-in-out 
                            text-lg shadow-lg hover:shadow-xl cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:hidden" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span className="rtl:order-2">تأیید و ادامه ثبت سفارش</span>
                        </a>

                        <a href="/cart" className="flex items-center space-x-2 rtl:space-x-reverse 
                            bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold 
                            py-3 px-6 rounded-xl transition duration-300 ease-in-out 
                            text-lg shadow-md cursor-pointer">
                            <span className="rtl:order-2">بازگشت به سبد خرید</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>

                </div>

                <div className="md:basis-1/4">
                    <div className="checkout-sidebar sticky top-6 mt-6">
                        <CheckoutSummary submitButtonTitle='تایید و ادامه' submitButtonURL='/payment' />
                    </div>
                </div>

                {isModalOpen && <AddressFormModal isOpen={isModalOpen} onSave={handleSaveAddress} onClose={handleCloseModal} />}
            </div>
        </div>
    )
}
