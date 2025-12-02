import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import useAllProducts from "./../../Hooks/useAllProducts";
import {
  Typography,
  Card,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import api from "./../../api/axios"
import { useCart } from "./../../Contexts/CartContext"
import useAllCategories from "./../../Hooks/useAllCategories";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "./../../Components/Rating/StarRating"

const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: 200,
  height: "fit-content",
  margin: theme.spacing(1),
  textAlign: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  width: "20px",
  backgroundColor: "#f86b75",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "0.8rem",
  "& span": {
    margin: 0,
    padding: "2px 8px",
  },
  zIndex: 1,
}));

const StrikethroughPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  marginRight: theme.spacing(1),
}));

const DiscountedPrice = styled(Typography)(({ theme }) => ({
  color: "#f86b75",
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

export default function CategoryResults({ sorting }) {
  const Navigate = useNavigate();
  const { categories } = useAllCategories()
  const { products, loading, error } = useAllProducts();
  const { category } = useParams();
  const { orders, setOrders, triggerUpdate } = useCart()
  const [parentCategories, setParentCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [offers, setOffers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [categoryIds, setCategoryIds] = useState([])

  const sortOptions = useMemo(
    () => [
      { value: "all", label: "همه" },
      { value: "most-relevant", label: "مرتبط‌ترین" },
      { value: "best-seller", label: "پرفروش‌ترین" },
      { value: "best-offs", label: "پرتخفیف ترین" },
      { value: "cheapest", label: "ارزان‌ترین" },
      { value: "most-expensive", label: "گران‌ترین" },
    ],
    []
  );

  const filteredItems = useMemo(() => {

    if (!category || !categories || categories.length === 0) return;


    const allProducts = [...products]


    if (category === "most-sales") {
      return allProducts.filter((product) => product.count >= 50)
    } else if (category === "incredible-offers") {
      return allProducts.filter((product) => product.discountPercent >= 50)
    }

    const mainCategory = categories.find((cat) => cat.title === category);

    if (!mainCategory) return;

    const categoryChilds = categories.filter((cat) => cat.parent_id === mainCategory.id);

    const categoryIds = [mainCategory.id, ...categoryChilds.map((c) => c.id)]
    
    setCategoryIds(categoryIds)

    return products.filter((product) => categoryIds.includes(product.categoryID))

  }, [category, products, categories])


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/offs");
        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);



  useEffect(() => {
    if (!filteredItems || filteredItems.length === 0) return;

    let results = [...filteredItems]

    switch (activeFilter) {
      case "all":
        break;
      case "most-relevant":
        results = results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "best-seller":
        results = results.sort((a, b) => (b.sale || 0) - (a.sale || 0));
        break;
      case "best-offs":
        results = results.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case "cheapest":
        results = results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "most-expensive":
        results = results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(results);
  }, [activeFilter, filteredItems]);

  const getProductDiscount = useCallback((productId) => {
    return offers.find(
      (off) => Number(off.productID) === Number(productId) && off.isActive
    );
  }, [offers]);

  const calculateDiscountedPrice = useCallback((price, discountPercent) => {
    if (typeof price !== "number" || typeof discountPercent !== "number") {
      return price;
    }
    return Math.round(price * (1 - discountPercent / 100));
  }, []);

  return (
    <div className="mx-auto px-4 py-6" dir="rtl">
      <div className="w-full mb-6">
        <ul className="flex flex-wrap justify-center items-center gap-2 p-6  rounded-xl">
          {sortOptions.map((sort) => (
            <li
              key={sort.label}
              onClick={() => setActiveFilter(sort.value)}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === sort.value
                ? "bg-brand-primary text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
                }`}>
              {sort.label}
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">در حال بارگذاری...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = getProductDiscount(product.id);
            const discountedPrice = discount
              ? calculateDiscountedPrice(product.price, discount.percent)
              : null;

            return (
              <div
                key={product.id}
                className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative">
                  <img
                    src={
                      `/img/products/${product.img}` ||
                      "/img/products/default-product-pic.png"
                    }
                    alt={product.title || "product image"}
                    className="w-full h-48 object-contain bg-gray-50"
                  />
                  {product.hasDiscount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      %{product.discountPercent}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between p-4 min-h-60">
                  <StarRating score={product.popularity} />
                  <h3 className="text-base font-bold text-gray-800 truncate mb-2">
                    <a
                      href={`/productDetail/${product.title}`}
                      className="hover:text-blue-600"
                    >
                      {product.title || "product name"}
                    </a>
                  </h3>
                  <h4 className="text-base font-semibold text-gray-500 truncate mb-2">

                    {product.productDesc || "product name"}

                  </h4>

                  <div className="flex flex-col text-right text-sm mb-3 h-10">
                    {product.hasDiscount ? (
                      <>
                        <div className="text-gray-600 line-through">
                          {Number(product.price).toLocaleString("fa-IR")} تومان
                        </div>
                        <div className="text-green-600 font-bold">
                          {(product.price - (product.price * product.discountPercent / 100)).toLocaleString("fa-IR")} تومان
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-800 font-medium">
                        {Number(product.price).toLocaleString("fa-IR")} تومان
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => Navigate(`/productDetail/${product.title}`)}
                    className="w-full bg-transparent border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg py-2 text-sm font-medium transition-all"
                  >
                    بیشتر
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          برای دسته‌بندی {category} محصولی یافت نشد
        </p>
      )}
    </div>
  );
}