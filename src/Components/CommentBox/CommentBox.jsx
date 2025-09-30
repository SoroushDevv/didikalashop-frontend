import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import "./CommentBox.css"
import { CheckCircle, Cancel } from "@mui/icons-material";
import StarRating from "../Rating/StarRating";
import useAllProducts from "../../Hooks/useAllProducts";

export default function CommentBox({ comment }) {
  const { products } = useAllProducts();

  // پیدا کردن محصول مرتبط
  const relatedProduct = useMemo(() => {
    if (!products || !comment?.productID) return null;
    return products.find((p) => p.id === comment.productID);
  }, [products, comment]);

  const statusChip = comment.status ? (
    <Chip
      icon={<CheckCircle />}
      label="تایید شده"
      color="success"
      variant="outlined"
      size="small"
      sx={{ padding: "10px" }}
    />
  ) : (
    <Chip
      icon={<Cancel />}
      label="رد شده"
      color="error"
      variant="outlined"
      size="small"
      sx={{ padding: "10px" }}
    />
  );



  console.log(relatedProduct)
  return (
    <Card className="comment-card">
      <CardHeader

        subheader={<StarRating score={comment.rating} />}
        action={
          comment.status ? (
            <Chip label="تایید شده" color="success" variant="outlined" size="small" />
          ) : (
            <Chip label="رد شده" color="error" variant="outlined" size="small" />
          )
        }
      />

      <Divider />

      <CardContent className="cart-content">
        {relatedProduct && (
          <Box
            component="img"
            src={`/img/products/${relatedProduct.img}`}
            alt={relatedProduct.title}
            className="comment-card__image"
          />
        )}
        
          <Typography variant="subtitle1" fontWeight="bold">
            {comment.title || "کامنت"}
          </Typography>
        
        <Typography className="comment-card__text">
          {comment.body}
        </Typography>
      </CardContent>
    </Card>

  );
}
