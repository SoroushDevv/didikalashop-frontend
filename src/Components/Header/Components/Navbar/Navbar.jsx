import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "../../../ShoppingCart/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import MegaMenu from "./Components/MegaMenu";
import ErrorMessage from "./../../../../Pages/ErrorMessage/ErrorMessage";
import { useCart } from "./../../../../Contexts/CartContext"
import LocalOrders from "./../../../../Components/LocalOrders/LocalOrders"
import useProductCategories from "../../../../Hooks/useAllCategories";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import useAllProducts from "../../../../Hooks/useAllProducts";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { LogIn } from 'lucide-react';


export default function Navbar({ isAuth, topbarHeight, onNavbarHeightChange }) {

  const navigate = useNavigate()
  const navContainerRef = useRef(null)
  const mainMenuRef = useRef(null)
  const { order, setOrder, triggerUpdate } = useCart();
  const { categories, laoding: categoriesLoading, error: categoriesError } = useProductCategories()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [showUserBasket, setShowUserBasket] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showDropdownMenu, setShowDropDownMenu] = useState(false)
  const { products, loading, error } = useAllProducts();
  const { isActive, setIsActive } = useState(false)


  useEffect(() => {

    if (navContainerRef.current) {

      setOffsetHeight(navContainerRef.current.offsetHeight)
      onNavbarHeightChange(navContainerRef.current.offsetHeight)
    }

    if (mainMenuRef.current) {
      console.log("main menu ref :", mainMenuRef.current.offsetLeft)
      setOffsetLeft(mainMenuRef.current.offsetLeft)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (searchValue.length >= 3) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchValue, products]);

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products/s=${encodeURIComponent(searchValue)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (product) => {
    navigate(`/search/${product.title}`);
    setShowResults(false);
  };

  const activeListHandler = (event) => {
    event.preventDefault();

    document.querySelectorAll(".sub-list-item").forEach((item) => {
      item.classList.remove("active");
    });

    event.target.classList.add("active");
  };

  return (
    <div
      className={` absolute left-0 right-0 bg-base-white shadow-md z-40 w-full h-50 transition-all duration-200 ease-in-out border rounded-md bg-transparent`} ref={navContainerRef} style={{ top: isScrolled ? '-40px' : `${topbarHeight}px` }} onClick={() => setShowResults(false)}
    >

      <div className="w-full mx-0 px-0 md:max-w-7xl md:px-4 md:mx-auto">
        <nav className="h-16 px-2 flex justify-between items-center" ref={mainMenuRef}>
          <div className="hidden  md:flex md:justify-start md:items-center md:gap-1 md:w-fit md:h-full">

            <Link to="#" className="relative nav-list-item category-list flex items-center gap-1 h-full "
              onMouseEnter={() => {
                setIsCategoryHovered(true)
              }}
              onMouseLeave={() => {
                setIsCategoryHovered(false)
              }}>
              <MenuOutlinedIcon className="text-xl" />
              <span className={`category-name`}    >دسته‌بندی کالاها




              </span>


              <MegaMenu isCategoryHovered={isCategoryHovered} topHeight={offsetHeight} />
            </Link>
            <Link to="/blogs/all" className="nav-list-item ">
              <span >مقالات</span>
            </Link>
            <Link className="nav-list-item">
              <span >سوال داری؟</span>
            </Link>
          </div>

          <div className="visible w-3/5 h-fit content-center md:hidden">
            <form className="relative w-full h-full flex justify-between items-center" onSubmit={handleSearchSubmit}>

              <input
                className="input-style"
                type="text"
                placeholder="نام کالا، برند و یا دسته مورد نظر خود را جستجو کنید…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {searchValue ? (
                <button
                  className="absolute left-0 p-1 fill-[#eee]" style={{ width: "30px", height: "30px" }}
                  type="button"
                  onClick={handleClearSearch}
                >
                  <ClearOutlinedIcon />
                </button>
              ) : <SearchOutlinedIcon className="absolute left-0 p-1 fill-[#eee]" style={{ width: "30px", height: "30px" }} />}


              {showResults && (
                <>
                  <div className="absolute top-full right-0 left-0 bg-white border border-solid border-gray-500 rounded-md mt-1 py-1 px-2 z-50">
                    {loading ? (
                      <p className="text-center">در حال بارگذاری...</p>
                    ) : error ? (
                      <p className="text-center text-danger">{error}</p>
                    ) : searchResults.length > 0 ? (
                      <ul className="search-result-list">
                        {searchResults.map((product) => (
                          <li className="py-2 px-2 rounded-md hover:bg-red-400 hover:text-white hover:text-bold" key={product.id}>
                            <Link
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleResultClick(product);
                              }}
                            >
                              {product.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ErrorMessage msg={"محصولی یافت نشد"} />
                    )}
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="relative h-full flex items-center"
            onMouseEnter={() => { setShowUserBasket(true) }}
            onMouseLeave={() => setShowUserBasket(false)}
          >
            <div className="h-full">
              {isAuth ? (
                <>

                  <div className="relative flex items-center space-x-2 space-x-reverse h-full cursor-pointer group">

                    <span className="btn-info">سبد خرید
                      <ShoppingCartIcon className="text-2xl text-white transition" />
                    </span>

                    <span className="absolute top-0 left-0 bg-brand-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {order?.items.length ? order?.items.length : 0}
                    </span>
                  </div>

                  {showUserBasket && (
                    <LocalOrders height={offsetHeight} offLeft={offsetLeft} />
                  )}
                </>
              ) : (
                <>
                  <div className="hidden md:flex md:items-center md:space-x-2 md:space-x-reverse md:h-full">
                    <Link to="/cart" className="btn-info">سبد خرید</Link>
                    <ShoppingCartIcon className="text-2xl text-gray-medium" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse h-full md:hidden">
                    <Link to="/login" className="btn-info">ورود/ثبت نام </Link>
                        <LogIn className="text-2xl text-gray-medium"/>
                  </div>
                </>

              )}
            </div>
          </div>
        </nav>
      </div>


    </div>
  );
}
