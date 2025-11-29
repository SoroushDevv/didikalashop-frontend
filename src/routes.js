import React from "react";

import Home from "./Pages/Home/Home.jsx";
import Blogs from "./Pages/Blogs/Blogs.jsx";
import BlogDetail from "./Pages/Blogs/BlogDetail/BlogDetail.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Login from "./Pages/Login/LoginPage.jsx";
import Register from "./Pages/Register/Register.jsx";
import Privacy from "./Pages/Privacy/Privacy.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Products from "./Pages/Products/Products.jsx";
import Shipping from "./Pages/Shipping/Shipping.jsx";
import SingleProduct from "./Pages/SingleProduct/SingleProduct.jsx";
import MainFAQ from "./Pages/FAQ/Main/MainFAQ.jsx";
import CategoryFAQ from "./Pages/FAQ/Category/CategoryFAQ.jsx";
import FAQQuestionPage from "./Pages/FAQ/Question/FAQQuestionPage.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import UserAddresses from "./Pages/Profile/Components/UserAddresses/UserAddresses.jsx";
import UserComments from "./Pages/Profile/Components/UserComments/UserComments.jsx";
import UserFavorite from "./Pages/Profile/Components/UserFavorites/UserFavorites.jsx";
import UserOrderDetails from "./Pages/Shipping/Components/UserOrderDetails/UserOrderDetails.jsx";
import UserPersonalInfo from "./Pages/Profile/Components/UserInfo/UserInfo.jsx";
import UserOrderReturns from "./Pages/Profile/Components/UserOrderReturns/UserOrderReturn.jsx";
import UserHistory from "./Pages/Profile/Components/UserHistory/UserHistory.jsx";
import UserOrders from "./Pages/Profile/Components/UserOrders/UserOrders.jsx";
import ProfileFirstPageContent from "./Pages/Profile/Components/MainContent/ProfileFirstPageContent.jsx";
import SearchResults from "./Pages/Search/SearchResults.jsx"
import SingleProductSearch from "./Pages/SingleProductSearch/SingleProductSearch.jsx";
import Payment from "./Pages/Shipping/Components/Payment/Payment.jsx"
import CompletePayment from "./Pages/Shipping/Components/CompletePayment/CompletePayment.jsx"
import ChangePassword from "./Components/changePassword/ChangePassword.jsx"
import CategoryResults from "./Pages/CategoryResults/CategoryResults.jsx";
import IncredibleOffers from "./Pages/IncredibleOffers/IncredibleOffers.jsx"
import MostSales from "./Pages/MostSales/MostSales.jsx"
import ProfileOrdersDetails from "./Pages/Profile/Components/ProfileOrdersDetails/ProfileOrdersDetails.jsx";
//mobile routes for user profile
import MobileProfile from "./Pages/MobileProfile/MainPage/MobileProfile.jsx";
import AddressesMobile from "./Pages/MobileProfile/Addresses/AddressesMobile.jsx";
import CommentsMobile from "./Pages/MobileProfile/Comments/CommentsMobile.jsx";
import FavoritesMobile from "./Pages/MobileProfile/Favorites/FavoritesMobile.jsx";
import OrderReturnsMobile from "./Pages/MobileProfile/Returns/ReturnsMobile.jsx";
import UserInfoMobile from "./Pages/MobileProfile/UserInfo/UserInfoMobile.jsx";
import OrdersDetailsMobile from "./Pages/MobileProfile/OrdersDetails/OrdersDetailsMobile.jsx";
import UserHistoryMobile from "./Pages/MobileProfile/History/HistoryMobile.jsx";
import UserOrdersMobile from "./Pages/MobileProfile/Orders/OrdersMobile.jsx";



let routes = [
    { path: "/", element: <Home /> },

    {
        path: "/blogs", element: <Blogs />, children: [
            { path: "/blogs/:category", element: <Blogs /> }
        ]
    },
    { path: "/blog-details/:id", element: <BlogDetail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/privacy", element: <Privacy /> },
    {
        path: "/profile", element: <Profile />, children: [
            { index: true, element: <ProfileFirstPageContent /> },
            { path: "user-info", element: <UserPersonalInfo /> },
            { path: "addresses", element: <UserAddresses /> },
            { path: "order-returns", element: <UserOrderReturns /> },
            { path: "favorites", element: <UserFavorite /> },
            { path: "history", element: <UserHistory /> },
            { path: "comments", element: <UserComments /> },
            { path: "orders", element: <UserOrders /> },
            { path: "orders/:orderId", element: <ProfileOrdersDetails /> },

            { path: "change-pass", element: <ChangePassword /> },
        ]
    },
     {
        path: "/mobile-profile", element: <MobileProfile />, children: [
            { path: "addresses", element: <AddressesMobile /> },
            { path: "comments", element: <CommentsMobile /> },
            { path: "favorites", element: <FavoritesMobile /> },
            { path: "orders/:orderId", element: <OrdersDetailsMobile /> },
            { path: "order-returns", element: <OrderReturnsMobile /> },
            { path: "user-info", element: <UserInfoMobile /> },
            { path: "history", element: <UserHistoryMobile /> },
            { path: "orders", element: <UserOrdersMobile /> },

            { path: "change-pass", element: <ChangePassword /> },
        ]
    },
    { path: "order-details", element: <UserOrderDetails /> },
    {
        path: "/product", element: <SingleProduct />,
        children: [
            { path: "", element: <Products /> },
            { path: ":category", element: <Products /> },

        ]
    },
    { path: "/productDetail/:productTitle", element: <SingleProduct /> },
    { path: "/search/:productTitle", element: <SingleProductSearch /> },
    { path: "/search/:category/:productTitle", element: <SearchResults /> },
    { path: "/category/:category", element: <CategoryResults /> },
    { path: "/shipping", element: <Shipping /> },
    { path: "/payment", element: <Payment /> },
    { path: "/complete-payment", element: <CompletePayment /> },
    { path: "/incredible-offers", element: <IncredibleOffers /> },
    { path: "/most-sales", element: <MostSales /> },
    { path: "/faq", element: <MainFAQ /> },
    { path: "/faq-category", element: <CategoryFAQ /> },
    { path: "/fa-question", element: <FAQQuestionPage /> },
    { path: "/error-page", element: <ErrorPage /> },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "*", element: <ErrorPage /> },
]

export default routes;