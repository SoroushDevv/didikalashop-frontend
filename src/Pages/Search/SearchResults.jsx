import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import useAllProducts from "./../../Hooks/useAllProducts";
import {
  Box,
  Typography,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import api from "../../api/axios";
import useProductCategories from "../../Hooks/useAllCategories";
import {useCart} from "./../../Contexts/CartContext"



const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: 200,
  height: 360,
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
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
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

export default function SearchResults({ sorting }) {
  const navigate = useNavigate();
  const {orders,setOrders,triggerUpdate} = useCart()
  const { searchValue, category = "all" } = useParams();
  const { products, loading, error } = useAllProducts();
  const { productCategories } = useProductCategories();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  const sortOptions = useMemo(
    () => [
      { value: "all", label: "همه" },
      { value: "most-relevant", label: "مرتبط‌ترین" },
      { value: "best-seller", label: "پرفروش‌ترین" },
      { value: "cheapest", label: "ارزان‌ترین" },
      { value: "most-expensive", label: "گران‌ترین" },
    ],
    []
  );

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/api/offs");
        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchValue) {
      const searchLower = decodeURIComponent(searchValue).toLowerCase();
      result = result.filter((product) =>
        (product.title || product.name || "").toLowerCase().includes(searchLower)
      );
    }

    if (category && category !== "all") {
      result = result.filter((product) =>
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    switch (sorting) {
      case "all":
        break;
      case "most-relevant":
        result = result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "best-seller":
        result = result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "cheapest":
        result = result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "most-expensive":
        result = result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchValue, category, sorting, products]);

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
    <div className="search-results dt">
      <div className="container">
        <Typography variant="h5" className="search-title">
          نتایج جستجو برای: {searchValue ? decodeURIComponent(searchValue) : "همه"}
          {category && category !== "all" ? `، دسته‌بندی: ${category}` : ""}
        </Typography>
        {loading ? (
          <Typography className="text-center">در حال بارگذاری...</Typography>
        ) : error ? (
          <Typography className="text-center text-danger">{error}</Typography>
        ) : filteredProducts.length > 0 ? (
          <Box className="row">
            {filteredProducts.map((product) => {
              const discount = getProductDiscount(product.id);
              const discountedPrice = discount
                ? calculateDiscountedPrice(product.price, discount.percent)
                : null;

              return (
                <Box className="col-md-4 col-sm-6 mb-4" key={product.id}>
                  <ProductCard>
                    <Box className="mui-card-top-content">
                      {discount && (
                        <DiscountChip
                          label={`%${discount.percent}`}
                          className="discount-chip"
                        />
                      )}
                      <Rating
                        name={`rating-${product.id}`}
                        value={product.popularity || 0}
                        readOnly
                        precision={1}
                        sx={{ mt: 1 }}
                        className="product-rating"
                      />
                    </Box>
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.img || "/placeholder.jpg"}
                      alt={product.title || product.name}
                      className="product-image"
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        className="product-title"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <a href={`/product/${product.id}`}>
                          {product.title || product.name}
                        </a>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="a"
                        href={
                          searchValue
                            ? `/product/s=${encodeURIComponent(searchValue)}&cat=${encodeURIComponent(product.category || "all")}`
                            : `/product/cat=${encodeURIComponent(product.category || "all")}`
                        }
                        sx={{
                          textDecoration: "none",
                          display: "block",
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="product-category"
                      >
                        {product.category || "کالای فروشگاه"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: 24,
                          flexWrap: "nowrap",
                        }}
                      >
                        {discount ? (
                          <>
                            <StrikethroughPrice variant="body2">
                              {product.price.toLocaleString("fa-IR")} تومان
                            </StrikethroughPrice>
                            <DiscountedPrice variant="body2">
                              {discountedPrice.toLocaleString("fa-IR")} تومان
                            </DiscountedPrice>
                          </>
                        ) : (
                          <Typography
                            variant="body2"
                            color="black"
                            className="product-price"
                          >
                            {product.price.toLocaleString("fa-IR")} تومان
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        className="edit-button"
                        sx={{ mt: 1 }}
                        onClick={() => alert(`خرید محصول: ${product.title || product.name}`)}
                      >
                        خرید
                      </Button>
                    </CardContent>
                  </ProductCard>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box className="no-results">
            <Typography variant="h2">نتیجه‌ای یافت نشد</Typography>
            <Typography>
              برای جستجوی "{searchValue ? decodeURIComponent(searchValue) : "همه"}"
              {category && category !== "all" ? ` و دسته‌بندی "${category}"` : ""} و
              مرتب‌سازی "{sortOptions.find((opt) => opt.value === sorting)?.label || "همه"}"
              هیچ محصولی یافت نشد.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}