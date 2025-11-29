import React, { useEffect, useState, useRef } from "react";
import "./Topbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../../../Pages/ErrorMessage/ErrorMessage";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { removeAuthToken } from "../../../../Utils/AuthUtils";
import { removeLocalStorage, setLocalStorage } from "../../../../Utils/StorageUtils";
import useAllProducts from "../../../../Hooks/useAllProducts";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function Topbar({ isAuth, onTopbarHeightChange }) {

  const { currentUser } = useCurrentUser();
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const { products, loading, error } = useAllProducts();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [showDropdownMenu, setShowDropDownMenu] = useState(false)
  const topbarRef = useRef(null)
  const searchAreaRef = useRef(null)
  const navigate = useNavigate();


useEffect(() => {

  const handleClickOutside = (event) => {
    if(searchAreaRef.current && !searchAreaRef.current.contains(event.target)) {
      setShowResults(false)
      setSearchValue("")
    }
  } 
  document.addEventListener("mousedown", handleClickOutside)
 return () => {
  document.removeEventListener("mousedown", handleClickOutside)
 }
},[searchAreaRef])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)
    return () => {
      window.removeEventListener("resize",handleResize)
    }
  },[])

  useEffect(() => {
    if (topbarRef.current) {
      setOffsetHeight(topbarRef.current.offsetHeight)
      onTopbarHeightChange(topbarRef.current.offsetHeight)
    }
  }, [offsetHeight,windowWidth])


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
    navigate(`/productDetail/${product.title}`);
    setShowResults(false);
  };

  return (
   

        <div className="hidden md:block md:sticky md:top-0 md:bg-white md:max-w-[1280px] md:w-full md:z-50" ref={topbarRef}>
          <div className="flex flex-row justify-between items-center py-2.5  w-full h-16 ">
            <div className="block h-auto w-50 object-contain ">
              <Link to="/">
                <img className="w-full h-full" src="/img/logo.png" alt="didikalalogo" />
              </Link>
            </div>

            <div className=" w-3/5 h-fit content-center " ref={searchAreaRef}>
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
                    <div className="search-result absolute top-full right-0 left-0 bg-white border border-solid border-gray-500 rounded-md mt-1 py-1 px-2 z-50">
                      {loading ? (
                        <p className="text-center">در حال بارگذاری...</p>
                      ) : error ? (
                        <p className="text-center text-danger">{error}</p>
                      ) : searchResults.length > 0 ? (
                        <ul className="list-none p-0 m-0 divide-y-2">
                          {searchResults.map((product) => (
                            <li className="py-2 px-2 rounded-md hover:bg-red-400 hover:text-white hover:text-bold " key={product.id}>
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
                        <p className="text-center">محصولی یافت نشد</p>
                      )}
                    </div>
                  </>
                )}
              </form>
            </div>

            <div
              className="topbar-account_area"
              onMouseEnter={() => setShowDropDownMenu(true)}
              onMouseLeave={() => setShowDropDownMenu(false)}
            >
              {!isAuth ? (
                <div className="topbar-register_wrapper">
                  <button className="topbar-register_button">
                    <Link to="/login">ثبت نام / ورود</Link>
                  </button>
                </div>
              ) : (
                <div className="topbar-account_menu">
                  <button
                    type="button"
                    className="topbar-account_toggle"
                    aria-haspopup="true"
                    aria-expanded={showDropdownMenu}
                  >
                    <span className="topbar-account_label">حساب کاربری</span>
                    <AccountCircleIcon className="topbar-account_icon" />
                  </button>

                  <div
                    className={`topbar-account_dropdown ${showDropdownMenu ? "show" : ""}`}
                  >
                    <Link to="/profile" className="topbar-account_item">
                      <PersonOutlinedIcon /> پروفایل
                    </Link>

                    <Link
                      to="/profile/comments"
                      className="topbar-account_item topbar-account_message "
                    >
                      <div className="relative pt-3 pl-3  message-icon">
                        <EmailOutlinedIcon />

                      <span className="absolute top-1 left-1 size-4  rounded-full message-badge flex justify-center items-center">0</span>
                      </div>
                      پیغام‌ها
                    </Link>

                    <Link to="/profile/user-info" className="topbar-account_item">
                      <EditOutlinedIcon /> ویرایش حساب کاربری
                    </Link>

                    <div className="topbar-account_divider" role="presentation"></div>

                    <Link
                      className="topbar-account_item"
                      to="/"
                      onClick={() => {
                        removeAuthToken();
                        removeLocalStorage("authToken");
                        removeLocalStorage("orders");
                        localStorage.setItem("cart", []);
                        window.location.reload();
                      }}
                    >
                      <LogoutOutlinedIcon /> خروج
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  );
}