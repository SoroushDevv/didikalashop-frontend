import { useMemo, useCallback } from "react";
import useAllProducts from "./../../Hooks/useAllProducts";
import useOffs from "../../Hooks/useAllOffs";
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
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./IncredibleOffers.css";

const ProductCard = styled(Card)(({ theme }) => ({
    minWidth: 200,
    height: "100%",
    textAlign: "center",
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
    backgroundColor: "#f86b75",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.8rem",
    "& span": { margin: 0, padding: "2px 8px" },
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

export default function IncredibleOffers() {
    const { products, loading, error } = useAllProducts();
    const { offs } = useOffs();
    const Navigate = useNavigate()
    // const getProductDiscount = useCallback((productId) => offs?.find(off => Number(off.productID) === Number(productId) && off.isActive),
    //     [offs]
    // );

    const filteredItems = useMemo(() => {
        if (!products || !offs) return [];


        return products.filter(product => product.discountPercent >= 30)
        // return products.filter(product => {
        //     const discount = getProductDiscount(product.id);
        //     return discount && discount.percent >= 30;
        // });
    }, [products, offs]);

    return (
        <div className="search-results">
            <div className="container">
                {loading ? (
                    <Typography className="text-center">در حال بارگذاری...</Typography>
                ) : error ? (
                    <Typography className="text-center text-danger">{error}</Typography>
                ) : filteredItems.length > 0 ? (
                    <Box className="row">
                        {filteredItems.map(product => {
                            const discount = product.discountPercent
                            const discountedPrice = discount
                                ? Math.round(product.price * (1 - discount.percent / 100))
                                : null;

                            return (
                                <Box className="col-md-4 col-sm-6 mb-4" key={product.id}>
                                    <ProductCard className="product-card_container">
                                        <Box className="mui-card-top-content" marginBottom={"15px"}>
                                            <Rating
                                                name={`rating-${product.id}`}
                                                value={product.popularity || 0}
                                                readOnly
                                                precision={1}
                                                className="product-rating"
                                            />
                                            {product.discountPercent && <DiscountChip className="discount-chip" label={`%${product.discountPercent}`} />}
                                        </Box>

                                        <CardMedia
                                            component="img"
                                            height="180"

                                            image={product.img ? `/img/products/${product.img}` : "/img/products/default-product-pic.png"}
                                            alt={product.title || product.name}
                                            className="product-image"
                                            style={{objectFit:"contain"}}
                                        />

                                        <CardContent
                                            className="incredible-offer-card_content"
                                            sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 1,marginTop:3 }}
                                        >
                                            <Typography
                                                variant="body1"
                                                className="product-title"
                                                sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                            >
                                                <a href={`/productDetail/${product.title}`}>{product.title || product.name}</a>
                                            </Typography>

                                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", minHeight: 60 }}>
                                                {discountedPrice ? (
                                                    <>
                                                        <div>
                                                            <Typography variant="body2" color="black">قیمت :</Typography>
                                                            <StrikethroughPrice>{product.price.toLocaleString("fa-IR")} تومان</StrikethroughPrice>
                                                        </div>
                                                        <div>
                                                            <Typography variant="body2" color="black">قیمت با تخفیف:</Typography>
                                                            <DiscountedPrice>{discountedPrice.toLocaleString("fa-IR")} تومان</DiscountedPrice>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Typography variant="body2" color="black">{product.price.toLocaleString("fa-IR")} تومان</Typography>
                                                )}
                                            </Box>

                                            <Button
                                                className="edit-button"
                                                variant="outlined"
                                                size="small"
                                                onClick={() => Navigate(`/productDetail/${product.title}`)}
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
                    <ErrorMessage msg="محصولی یافت نشد" />
                )}
            </div>
        </div>
    );
}
