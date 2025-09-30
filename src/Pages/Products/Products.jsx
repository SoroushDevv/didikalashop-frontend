import React, { useState } from "react";
import "./Products.css";
import Sidebar from "./Sidebar/Sidebar";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import SearchResults from "../Search/SearchResults";

export default function Products() {
  const [sort, setSort] = useState("all");

  const sortOptions = [
    { label: "همه", value: "all" },
    { label: "مرتبط‌ترین", value: "most-relevant" },
    { label: "پرفروش‌ترین", value: "best-seller" },
    { label: "ارزان‌ترین", value: "cheapest" },
    { label: "گران‌ترین", value: "most-expensive" },
  ];

  const sortHandler = (value) => {
    setSort(value);
  };

  return (
    <div className="row products-main-content">
      <Sidebar />
      <div className="col-lg-9 col-md-12 col-sm-12 products-card-res">
        <div className="d-md-none">
          <button className="btn-filter-sidebar">
            جستجوی پیشرفته <i className="fad fa-sliders-h"></i>
          </button>
        </div>
        <div className="dt-sl dt-sn px-0 products-amazing-tab">
          <div className="ah-tab-wrapper dt-sl">
            <div className="ah-tab dt-sl">
              <div className="products-tabs dt-sl">
                <span>
                  <SwapVertOutlinedIcon />
                  مرتب‌سازی بر اساس:
                </span>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`ah-tab-item ${sort === option.value ? "active" : ""}`}
                    onClick={() => sortHandler(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="ah-tab-content-wrapper dt-sl px-res-0">
            <div className="ah-tab-content dt-sl" data-ah-tab-active="true">
              <div className="row mb-3 mx-0 px-res-0">
                <SearchResults sorting={sort} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}