import React, { useState } from "react";
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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <aside className="w-full md:w-1/4">
        <Sidebar />
      </aside>

      <div className="flex-1">
        <div className="md:hidden mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            جستجوی پیشرفته
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <SwapVertOutlinedIcon /> مرتب‌سازی بر اساس:
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 rounded-full border transition ${
                  sort === option.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
                onClick={() => setSort(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <SearchResults sorting={sort} />
        </div>
      </div>
    </div>
  );
}
