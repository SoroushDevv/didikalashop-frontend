import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAllProducts from "../../Hooks/useAllProducts";
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
import "./CatProductList.css";
import axios from "axios";
import ShowSwal from "./../ShowSwal/ShowSwal";
import SnackBar from "./../SnackBar/SnackBar";

// استایل‌های کارت
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

export default function CatProductList({ sort }) {
  const { searchValue, category } = useParams(); // دریافت searchValue و category از URL
  const { products, loading, error } = useAllProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  // بارگذاری تخفیف‌ها
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/offs");
        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  // فیلتر و مرتب‌سازی محصولات
  useEffect(() => {
    let result = [...products];

    // فیلتر بر اساس searchValue
    if (searchValue) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(decodeURIComponent(searchValue).toLowerCase())
      );
    }

    // فیلتر بر اساس category
    if (category && category !== "all") {
      result = result.filter((product) =>
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // مرتب‌سازی
    switch (sort) {
      case "all":
        break;
      case "most-relevant":
        result = result.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
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
  }, [searchValue, category, sort, products]);

  // یافتن تخفیف محصول
  const getProductDiscount = (productId) => {
    return offers.find(
      (off) => Number(off.productID) === Number(productId) && off.isActive
    );
  };

  // محاسبه قیمت تخفیف‌دار
  const calculateDiscountedPrice = (price, discountPercent) => {
    if (typeof price !== "number" || typeof discountPercent !== "number") {
      return price;
    }
    return Math.round(price * (1 - discountPercent / 100));
  };

  // نگاشت sort به برچسب
  const sortLabels = {
    all: "همه",
    "most-relevant": "مرتبط‌ترین",
    "best-seller": "پرفروش‌ترین",
    cheapest: "ارزان‌ترین",
    "most-expensive": "گران‌ترین",
  };

  return (
    <div className="cat-product-list dt-sl">
      <div className="container">
        <Typography variant="h5" className="category-title">
          محصولات در دسته‌بندی: {category === "all" ? "همه" : category || "همه"}
          {searchValue && `، جستجو: ${decodeURIComponent(searchValue)}`}
        </Typography>
        {loading ? (
          <Typography className="text-center">در حال بارگذاری...</Typography>
        ) : error ? (
          <Typography className="text-center text-danger">{error}</Typography>
        ) : filteredProducts.length > 0 ? (
          <Box className="row">
            <Typography variant="h6">
              مرتب‌سازی: {sortLabels[sort] || "همه"}
            </Typography>
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
                      alt={product.title}
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
                        <a href={`/product/${product.id}`}>{product.title}</a>
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
                        onClick={() => {
                          ShowSwal({
                            title: "به سبد خرید اضافه شود؟",
                            text: " ",
                            icon: "info",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "اضافه کن",
                            cancelButtonText: "خیر",
                            onConfirm: () => {
                              ShowSwal({
                                title: "با موفقیت اضافه شد",
                                text: " ",
                                icon: "success",
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                              console.log("اضافه شد");
                            },
                          });
                        }}
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
              برای دسته‌بندی "{category === "all" ? "همه" : category || "همه"}"
              {searchValue && ` و جستجو "${decodeURIComponent(searchValue)}"`} و
              مرتب‌سازی "{sortLabels[sort] || "همه"}" هیچ محصولی یافت نشد.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}