import React from "react";
import Rating from "../Rating/StarRating";
export default function Product({product}) {




  return (
    <div class="item">
      <div class="product-card">
        <div class="product-head">
          <div class="rating-stars">
            <Rating score={product.rating} size="small" showLabel={false} />
          </div>
        </div>
        <a class="product-thumb" href="shop-single.html">
          <img src={product.image} alt="Product Thumbnail" />
        </a>
        <div class="product-card-body">
          <h5 class="product-title">
            <a href="shop-single.html">{product.name} </a>
          </h5>
          <a class="product-meta" href="shop-categories.html">
            {product.category}
          </a>
          <span class="product-price">{product.price.toLocaleString()} تومان</span>
        </div>
      </div>
    </div>
  );
}
