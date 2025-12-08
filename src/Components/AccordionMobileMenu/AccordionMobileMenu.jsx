import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAllCategories from "../../Hooks/useAllCategories";
import useAllProducts from "../../Hooks/useAllProducts";
import { styled } from "@mui/material";

const MegaMenuMobile = ( {isMenuOpen,setIsMenuOpen} ) => {
    const { categories, loading: catLoading, error: catError } = useAllCategories();
    const { products, loading: prodLoading, error: prodError } = useAllProducts();
    const [parentCategories, setParentCategories] = useState([]);
    const [isShowChildren, setIsShowChildren] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [activeParent, setActiveParent] = useState("گوشی")
    const [openIds, setOpenIds] = useState(new Set())


    useEffect(() => {

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

    useEffect(() => {
        if (parentCategories && !activeParent) {
            setActiveParent(parentCategories[0].title)
        }
    }, [parentCategories])
    const toggleTabs = (childId) => {
        setOpenIds((prev) => {
            const next = new Set(prev)
            if (next.has(childId)) next.delete(childId);
            else next.add(childId)
            return next;
        })
    }





    if (catLoading || prodLoading) return;
    if (catError || prodError) return;
    console.log("parent categories :", parentCategories)
    return (
        <div className={`fixed flex justify-start items-start top-0 left-0 bottom-0 w-full z-50 transition-all duration-300 bg-white h-full md:hidden ${isMenuOpen ? "right-0" : "-right-[500px]"}`}>
            <ul className={`z-10 w-fit h-screen overflow-y-auto bg-gray-100 border-l border-gray-200 p-0 m-0 list-none divide-y divide-solid`} >
                {parentCategories?.map((category) => (
                    <li key={category.id}
                        onClick={(e) => {
                            e.preventDefault()
                            setActiveParent(category.title)
                        }}
                        className={`relative flex flex-col justify-center gap-1 md:flex-row items-center p-3 cursor-pointer transition-colors duration-200 after:block after:absolute after:left-1 after:w-2 after:h-2 after:border-b-2 after:border-l-2 after:border-black after:transition-all after:duration-150 ${activeParent === category.title ? "after:rotate-45" : ""}`}>
                        <span className=" min-w-[40px] text-lg category-icon">{category.icon || "📁"}</span>
                        <Link to={`/category/${category.title}`} className="text-base font-medium no-underline text-inherit">
                            {category.title}
                        </Link>
                    </li>
                ))}


            </ul>
            {parentCategories?.map((parent) => (
                activeParent === parent.title && (
                    <div key={parent.id} className=" w-full h-full max-h-screen overflow-y-auto bg-white shadow-xl p-4 z-20 rounded-tl-xl rounded-bl-xl border border-gray-200">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-6">
                            {parent.children.map((child) => (
                                <div key={child.id} className="block w-full h-fit p-2">
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleTabs(child.id)
                                        }}
                                        className={`relative block text-lg font-bold w-full p-1 pr-4 before:block before:absolute before:top-0 before:right-0 before:h-full before:border-2 before:border-red-600`} >
                                        {child.title}
                                    </span>
                                    <ul className={`${openIds.has(child.id) ? "flex" : "hidden"} flex-col divide-y-2 pr-3`}>
                                        {child.products.map((product) => (
                                            <li className="w-full p-2  text-base">
                                                <a href={`/productDetail/${product.title}` } onClick = {() => setIsMenuOpen(false)}>{product.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )))}
        </div>
    );
};

export default MegaMenuMobile;