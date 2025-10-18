import { useParams, useNavigate } from "react-router-dom";
import "./MostSales.css"
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

export default function MostSales({ sorting }) {
  const Navigate = useNavigate();
  const { categories } = useAllCategories()
  const { category } = useParams();
  const { products, loading, error } = useAllProducts();
  const [filteredProducts, setFilteredProducts] = useState([])

  console.log(products)
  const filteredItems = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => product.count >= 50)
  }, [products]);


  const topSellingItems = useMemo(() => {
    return [...filteredItems]
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, 10);
  }, [filteredItems]);


  return (
    <div className="container">
      <div className="most-sale_results">
        <Typography variant="h5" className="search-title most-sale_title" style={{ margin: "10px 0" }}>
          {category && category !== "all" ? `دسته بندی: ${category}` : "پرفروش‌ترین‌ها"}
        </Typography>

        {loading ? (
          <Typography className="text-center">در حال بارگذاری...</Typography>
        ) : error ? (
          <Typography className="text-center text-danger">{error}</Typography>
        ) : topSellingItems.length > 0 ? (
          <Box className="row">
            {topSellingItems.map((product) => (
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
                    {product.discountPercent && (
                      <Chip
                        label={`%${product.discountPercent}`}
                        sx={{
                          backgroundColor: "#f86b75",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Box>

                  <CardMedia
                    component="img"
                    height="180"
                    image={product.img ? `/img/products/${product.img}` : "/img/products/default-product-pic.png"}
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
                      minHeight: "200px",
                      padding: 1,
                    }}
                    className="most-sale-card_content"
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
                      {product.discountedPrice ? (
                        <>
                          <div>
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
                              {product.discountedPrice.toLocaleString("fa-IR")} تومان
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
                      onClick={() => Navigate(`/productDetail/${product.title}`)}
                    >
                      خرید
                    </Button>
                  </CardContent>
                </ProductCard>
              </Box>
            ))}
          </Box>
        ) : (
          <ErrorMessage msg={`محصولی در دسته بندی ${category} یافت نشد`} />
        )}
      </div>
    </div>
  );
}

