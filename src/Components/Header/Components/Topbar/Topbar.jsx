import React, { useEffect, useState, useRef } from "react";
import "./Topbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../../../Pages/ErrorMessage/ErrorMessage";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { removeAuthToken } from "../../../../Utils/AuthUtils";
import { removeLocalStorage, setLocalStorage } from "../../../../Utils/StorageUtils";
import useAllProducts from "../../../../Hooks/useAllProducts";


export default function Topbar({ isAuth, onTopbarHeightChange }) {

  const { currentUser } = useCurrentUser();
  const { products, loading, error } = useAllProducts();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0)
  const [showDropdownMenu, setShowDropDownMenu] = useState(false)
  const topbarRef = useRef(null)
  const navigate = useNavigate();






  useEffect(() => {
    if (topbarRef.current) {
      setOffsetHeight(topbarRef.current.offsetHeight)
      onTopbarHeightChange(topbarRef.current.offsetHeight)
    }
  }, [offsetHeight])
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

  return (
    <div className="container nav-container">
      <div className="topbar" ref={topbarRef}>
        <div className="topbar-wrapper">
          <div className="col-lg-2 col-md-3 col-6">
            <div className="logo-area">
              <Link to="/">
                <img src="/img/logo.png" alt="didikala" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-5 hidden-sm">
            <div className="search-area dt-sl">
              <form className="search" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="نام کالا، برند و یا دسته مورد نظر خود را جستجو کنید…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <i className="far fa-search search-icon"></i>
                {searchValue && (
                  <button
                    className="close-search-result"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    <SearchOutlinedIcon />
                  </button>
                )}
                {showResults && (
                  <div className="search-result">
                    {loading ? (
                      <p className="text-center">در حال بارگذاری...</p>
                    ) : error ? (
                      <p className="text-center text-danger">{error}</p>
                    ) : searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((product) => (
                          <li key={product.id}>
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
                )}
              </form>
            </div>
          </div>
          <div className="col-md-4 col-6 topbar-left"
            onMouseEnter={() => setShowDropDownMenu(true)}
          >
            {!isAuth ? (
              <div className="register-button">
                <button>
                  <Link to="/login">ثبت نام / ورود</Link>
                </button>
              </div>
            ) : (
              <div className="top-bar-nav-item_container">
                <div
                  className="top-bar-nav-item account"

                >
                  <button
                    type="button"
                    className="nav-link account-toggle"
                    aria-haspopup="true"
                    aria-expanded={showDropdownMenu}
                  >
                    <span className="label-dropdown">حساب کاربری</span>
                    <AccountCircleIcon />
                  </button>

                  {showDropdownMenu && (
                    <div className="top-bar-dropdown-menu"
                      onMouseLeave={() => setShowDropDownMenu(false)}
                    >
                      <Link to="/profile" className="dropdown-item">
                        <PersonOutlinedIcon /> پروفایل
                      </Link>

                      <Link to="/profile/comments" className="dropdown-item message-item">
                        <div className="message">
                          <EmailOutlinedIcon />
                        </div>
                        <span className="float-left badge badge-light message-badge">0</span>
                        پیغام‌ها
                      </Link>

                      <Link to="/profile/user-info" className="dropdown-item">
                        <EditOutlinedIcon /> ویرایش حساب کاربری
                      </Link>

                      <div className="dropdown-divider" role="presentation"></div>

                      <Link
                        className="dropdown-item"
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
                  )}


                </div>

              </div>

            )}
          </div>
        </div>
      </div>

    </div>

  );
}