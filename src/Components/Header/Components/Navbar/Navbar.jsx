import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "../../../ShoppingCart/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import MegaMenu from "./Components/MegaMenu";
import ErrorMessage from "./../../../../Pages/ErrorMessage/ErrorMessage";
import { useCart } from "./../../../../Contexts/CartContext"
import LocalOrders from "./../../../../Components/LocalOrders/LocalOrders"
import useProductCategories from "../../../../Hooks/useAllCategories";

export default function Navbar({ isAuth, topbarHeight, onNavbarHeightChange }) {

  const navbarRef = useRef(null)
  const listItemRef = useRef(null)
  const mainMenuRef = useRef(null)
  const { orders, setOrders, triggerUpdate } = useCart();
  const { categories, laoding: categoriesLoading, error: categoriesError } = useProductCategories()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)

  const [showUserBasket, setShowUserBasket] = useState(false)

  useEffect(() => {

    if (listItemRef.current) {

      setOffsetHeight(listItemRef.current.offsetHeight)
      onNavbarHeightChange(listItemRef.current.offsetHeight)
    }

    if(mainMenuRef.current) {
      setOffsetLeft(mainMenuRef.current.offsetLeft)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeListHandler = (event) => {
    event.preventDefault();

    document.querySelectorAll(".sub-list-item").forEach((item) => {
      item.classList.remove("active");
    });

    event.target.classList.add("active");
  };

  return (
    <div
      class={
        isScrolled
          ? "bottom-header dt-sl mb-sm-bottom-header scrolled"
          : "bottom-header dt-sl mb-sm-bottom-header"
      }
      ref={navbarRef}
      style={{ position: "absolute", top: topbarHeight }}
    >
      <div class="container nav-container">
        <nav class="nav-main-menu " ref={mainMenuRef}>
          <div class="list-items_container hidden-sm">
            <Link to="#" className="list-item category-list"
              onMouseEnter={() => setIsCategoryHovered(true)}
              onMouseLeave={() => setIsCategoryHovered(false)}>
              <span className="category-icon">📋</span>
              <span className="category-name">دسته‌بندی کالاها</span>
              <MegaMenu isCategoryHovered={isCategoryHovered} topHeight={offsetHeight} />
            </Link>
            <Link to="/incredible-offers" class="list-item" ref={listItemRef}>
              پر تخفیف ترین ها
            </Link>
            <Link to="/most-sales" class="list-item">
              پر فروش ترین ها
            </Link>
            <Link to="/blogs/همه" class="list-item">
              مقالات
            </Link>
            <Link class="list-item">
              سوال داری؟
            </Link>
          </div>
          <div class="header-cart-tab"
           onMouseEnter={() => {
              setShowUserBasket(true)
            }}
            onMouseLeave={() => setShowUserBasket(false)}
            >
            <div class="nav-item-wrapper header-cart-tab-wrapper" >
              {isAuth ? (
                <>
                  <div  >
                    <span class="label-dropdown">سبد خرید</span>
                    <ShoppingCartIcon />
                    <span class="count" style={{ color: "white" }}>{orders ? orders.length : 0}</span>
                  </div>
                  {showUserBasket && <LocalOrders height={offsetHeight} offLeft={offsetLeft} />}
                </>
              ) : (
                <>
                  <Link to="/error">
                    <span class="label-dropdown">سبد خرید</span>
                    <ShoppingCartIcon />
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
