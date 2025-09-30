import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MegaMenu.css";
import useAllCategories from "../../../../../Hooks/useAllCategories";
import useAllProducts from "../../../../../Hooks/useAllProducts";

const MegaMenu = ({ isCategoryHovered, topHeight, rightOffset }) => {
  const { categories, loading: catLoading, error: catError } = useAllCategories();
  const { products, loading: prodLoading, error: prodError } = useAllProducts();
  const [parentCategories, setParentCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryListRef = useRef()
  const [categoriesContentRightOffset,setCategoriesContentRightOffset] = useState(0)
  useEffect(() => {

    if(categoryListRef.current) {
      setCategoriesContentRightOffset(categoryListRef.current.offsetWidth)
    }
 
    console.log(categoriesContentRightOffset)
  


    if (categories?.length > 0 && products?.length > 0) {

      const parents = categories.filter(cat => cat.parent_id === null);
      const categoriesWithChildren = parents.map(parent => {
        const children = categories.filter(cat => cat.parent_id === parent.id);
        const childrenWithProducts = children.map(child => {
          const childProducts = products.filter(p => {
            return p.categoryID === child.id
          });
          return {
            ...child,
            products: childProducts,
          };
        });
        return {
          ...parent,
          children: childrenWithProducts,
        };
      });
      setParentCategories(categoriesWithChildren);
    }
  }, [categories, products]);

  if (catLoading || prodLoading) return;
  if (catError || prodError) return;

  console.log("rightt space :", rightOffset)
  return (
    <div className={`mega-menu_wrapper ${isCategoryHovered ? "visible" : ""}`} style={{ top: topHeight }}>
      <div
        className={`mega-menu_container`}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        {/* لیست والدها */}
        {isCategoryHovered && (
          <ul className="categories-list" ref={categoryListRef} style={{ position: "absolute", right: rightOffset }} >

            {parentCategories.map((category) => (
              <li
                key={category.id}
                className={`category-item ${hoveredCategory?.id === category.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredCategory(category)}
              >
                <span className="category-icon">{category.icon || "📁"}</span>
                <Link to={`/category/${category.title}`} className="section-title">
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* زیرمنو */}
        {hoveredCategory && hoveredCategory.children && isCategoryHovered && (
          <div className="mega-menu__content" >
            <h3 className="content-title">{hoveredCategory.title}</h3>
            <div className="content-grid">
              {hoveredCategory.children.map(child => (
                <div key={child.id} className="content-section">
                  <span className="section-title">
                    {child.title}
                  </span>
                  {child.products && child.products.length > 0 && (
                    <ul className="section-items">
                      {child.products.map(product => (
                        <li key={product.id} className="section-item">
                          <Link to={`/productDetail/${product.title}`}>
                            {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>



  );

};

export default MegaMenu;
