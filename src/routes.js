import React from "react";

import Home from "./Pages/Home/Home";
import Blogs from "./Pages/Blogs/Blogs";
import BlogDetail from "./Pages/Blogs/BlogDetail/BlogDetail";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/LoginPage";
import Register from "./Pages/Register/Register";
import Privacy from "./Pages/Privacy/Privacy";
import Profile from "./Pages/Profile/Profile";
import Products from "./Pages/Products/Products";
import Shipping from "./Pages/Shipping/Shipping";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import VerifyPhoneNumber from "./Pages/VerifyPhoneNumber/VerifyNumber";
import Wellcome from "./Pages/Wellcome/Wellcome";
import MainFAQ from "./Pages/FAQ/Main/MainFAQ";
import CategoryFAQ from "./Pages/FAQ/Category/CategoryFAQ";
import FAQQuestionPage from "./Pages/FAQ/Question/FAQQuestionPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import UserAddresses from "./Pages/Profile/Components/UserAddresses/UserAddresses";
import UserComments from "./Pages/Profile/Components/UserComments/UserComments";
import UserFavorite from "./Pages/Profile/Components/UserFavorites/UserFavorites";
import UserOrderDetails from "./Pages/Shipping/Components/UserOrderDetails/UserOrderDetails";
import UserPersonalInfo from "./Pages/Profile/Components/UserInfo/UserInfo";
import UserOrderReturns from "./Pages/Profile/Components/UserOrderReturns/UserOrderReturn";
import UserHistory from "./Pages/Profile/Components/UserHistory/UserHistory";
import UserOrders from "./Pages/Profile/Components/UserOrders/UserOrders";
import ProfileFirstPageContent from "./Pages/Profile/Components/MainContent/ProfileFirstPageContent";
import SearchResults from "./Pages/Search/SearchResults"
import SingleProductSearch from "./Pages/SingleProductSearch/SingleProductSearch";
import Payment from "./Pages/Shipping/Components/Payment/Payment"
import CompletePayment from "./Pages/Shipping/Components/CompletePayment/CompletePayment"
import ChangePassword from "./Components/changePassword/ChangePassword"
import CategoryResults from "./Pages/CategoryResults/CategoryResults";
import IncredibleOffers from "./Pages/IncredibleOffers/IncredibleOffers"
import MostSales from "./Pages/MostSales/MostSales"

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
            { path: "favorite", element: <UserFavorite /> },
            { path: "history", element: <UserHistory /> },
            { path: "comments", element: <UserComments /> },
            { path: "orders", element: <UserOrders /> },
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
    { path: "/verify-number", element: <VerifyPhoneNumber /> },
    { path: "/welcome", element: <Wellcome /> },
    { path: "/faq", element: <MainFAQ /> },
    { path: "/faq-category", element: <CategoryFAQ /> },
    { path: "/fa-question", element: <FAQQuestionPage /> },
    { path: "/error-page", element: <ErrorPage /> },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "*", element: <ErrorPage /> },
]

export default routes;