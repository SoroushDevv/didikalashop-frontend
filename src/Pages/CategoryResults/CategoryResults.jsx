import { useParams, useNavigate } from "react-router-dom";
import "./CategoryResults.css"
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
import api from "./../../api/axios"
import { useCart } from "./../../Contexts/CartContext"
import useAllCategories from "./../../Hooks/useAllCategories";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
  const { orders, setOrders, triggerUpdate } = useCart()
  const { category } = useParams();
  const { products, loading, error } = useAllProducts();
  const [parentCategories, setParentCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [offers, setOffers] = useState([]);



  console.log(category)
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

  const filteredItems = useMemo(() => {


    if (!category || !categories || categories.length === 0) return;



    const mainCategory = categories.find((cat) => cat.title === category);
    console.log(mainCategory)
    if (!mainCategory) return;
    console.log(mainCategory.id);

    const categoryChilds = categories.filter((cat) => cat.parent_id === mainCategory.id);

    const categoryIds = [mainCategory.id, ...categoryChilds.map((c) => c.id)]


    return products.filter((product) => categoryIds.includes(product.categoryID))


  }, [category, products, categories])

  console.log(filteredProducts)

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
    if (category && category !== "all") {
      result = result.filter((product) => product.categoryID === category.id);
    }

    switch (sorting) {
      case "all":
        break;
      case "most-relevant":
        result = result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "best-seller":
        result = result.sort((a, b) => (b.sale || 0) - (a.sale || 0));
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
  }, [category, sorting, products]);

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

  console.log("filtered products:", filteredItems)
  return (
    <div className="container">
      <div className="search-results dt">
        <Typography variant="h5" className="category-title">
          {category && category !== "all" ? `دسته بندی: ${category}` : ""}
        </Typography>
        {loading ? (
          <Typography className="loading text-center">در حال بارگذاری...</Typography>
        ) : error ? (
          <Typography className="text-center text-danger">{error}</Typography>
        ) : filteredItems.length > 0 ? (
          <Box className="row">
            {filteredItems.map((product) => {
              const discount = getProductDiscount(product.id);
              const discountedPrice = discount
                ? calculateDiscountedPrice(product.price, discount.percent)
                : null;

              return (
                <Box className="col-md-4 col-sm-6 mb-4" key={product.id}>
                  <ProductCard className="product-card_container">
                    <Box className="mui-card-top-content">
                      <Rating
                        name={`rating-${product.id}`}
                        value={product.popularity || 0}
                        readOnly
                        precision={1}
                        sx={{ mt: 1, zIndex: 1 }}
                        className="product-rating"
                      />
                      {discount && (
                        <DiscountChip
                          label={`%${discount.percent}`}
                          className="discount-chip"
                        />
                      )}

                    </Box>
                    <CardMedia
                      component="img"
                      height="180"
                      image={`/img/products/${product.img}` || "/img/products/default-product-pic.png"}
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
                        <a href={`/productDetail/${product.title}`}>
                          {product.title || product.name}
                        </a>
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "start",

                          alignItems: "start",
                          minHeight: 24,
                          flexWrap: "nowrap",
                        }}
                      >
                        {discount ? (
                          <>
                            <div >
                              <Typography
                                variant="body2"
                                color="black"
                                className="product-price-title"
                                sx={{ textAlign: "start" }}
                              >
                                قیمت :
                              </Typography>
                              <StrikethroughPrice variant="body2">
                                {product.price.toLocaleString("fa-IR")} تومان
                              </StrikethroughPrice>
                            </div>

                            <div>
                              <Typography
                                variant="body2"
                                color="black"
                                className="product-discount-price-title"
                                sx={{ textAlign: "start" }}
                              >
                                قیمت با تخفیف:
                              </Typography>
                              <DiscountedPrice variant="body2">
                                {discountedPrice.toLocaleString("fa-IR")} تومان
                              </DiscountedPrice>
                            </div>

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
                        onClick={() => Navigate(`/productDetail/${product.title}`)}                      >
                        خرید
                      </Button>
                    </CardContent>
                  </ProductCard>
                </Box>
              );
            })}
          </Box>
        ) : (

          <ErrorMessage msg={`برای دسته بندی ${category} محصولی یافت نشد`} />

        )}
      </div>
    </div>
  );
}