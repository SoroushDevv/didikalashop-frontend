import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAllCategories from "../../../../../Hooks/useAllCategories";
import useAllProducts from "../../../../../Hooks/useAllProducts";

const MegaMenu = ({ isCategoryHovered, topHeight, rightOffset }) => {
  const { categories, loading: catLoading, error: catError } = useAllCategories();
  const { products, loading: prodLoading, error: prodError } = useAllProducts();
  const [parentCategories, setParentCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryListRef = useRef();
  const [categoriesContentRightOffset, setCategoriesContentRightOffset] = useState(0);

  useEffect(() => {
    if (categoryListRef.current) {
      setCategoriesContentRightOffset(categoryListRef.current.offsetWidth);
    }

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

  console.log("categ right offseet :", categoriesContentRightOffset)
  return (
    <div 
      className="absolute top-full left-0 w-full z-50 transition-all duration-300"
      style={{ display: isCategoryHovered ? 'block' : 'none' }}
    >
      <div
        className="relative rtl font-vazir"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        
        <ul 
          className={`
            absolute top-0 right-0 z-10 w-[250px] h-[500px] overflow-y-auto 
            bg-gray-100 border-l border-gray-200 p-0 m-0 list-none 
            rounded-tr-xl rounded-br-xl
          `}
          ref={categoryListRef} 
          style={{ right: rightOffset, height: '500px' }}
        >
          {parentCategories.map((category) => (
            <li
              key={category.id}
              className={`
                flex items-center p-3 cursor-pointer transition-colors duration-200
                ${hoveredCategory?.id === category.id 
                    ? "bg-white text-pink-600 font-semibold shadow-inner" 
                    : "hover:bg-white hover:text-pink-600"
                }
              `}
              onMouseEnter={() => setHoveredCategory(category)}
            >
              <span className="ml-3 min-w-[40px] text-lg category-icon">{category.icon || "📁"}</span>
              <Link to={`/category/${category.title}`} className="text-base font-medium no-underline text-inherit hover:text-pink-600">
                {category.title}
              </Link>
            </li>
          ))}
        </ul>

        {hoveredCategory && hoveredCategory.children && (
          <div 
            className="absolute top-0 right-[250px] w-[600px] h-[500px] max-h-screen overflow-y-auto 
                       bg-white shadow-xl p-4 z-20 
                       rounded-tl-xl rounded-bl-xl border border-gray-200"
            style={{right : categoriesContentRightOffset ? categoriesContentRightOffset : null }} 
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 content-title">
              {hoveredCategory.title}
            </h3>
            
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6"
            >
              {hoveredCategory.children.map(child => (
                <div key={child.id} className="mb-2 content-section">
                  <span className="text-base font-semibold text-pink-600 mb-2 block border-r-2 border-pink-600 pr-2 section-title">
                    {child.title}
                  </span>
                  {child.products && child.products.length > 0 && (
                    <ul className="list-none p-0 m-0 section-items">
                      {child.products.map(product => (
                        <li key={product.id} className="py-1 text-gray-600 text-sm hover:text-blue-600 transition-colors duration-150 section-item">
                          <Link to={`/productDetail/${product.title}`} className="no-underline text-inherit">
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