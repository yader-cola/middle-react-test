import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setSort} from "../../store/slices/productSlice/productsSlice.ts";
import {fetchProducts} from '../../store/slices/productSlice/thunks.ts';
import style from "./ProductList.module.css";
import {useParams} from "react-router-dom";
import type {Product} from "../../types/product.ts";
import {addToCart} from "../../store/slices/cartSlice.ts";
import Filters from "../Filters";
import Sorting from "../Sorting";
import Pagination from "../Pagination";
import ProductCard from "../ProductCard";
import {
    CATEGORIES,
    CATEGORY_LABELS,
    SORT_ORDERS,
    type Category,
    type SortField
} from "../../constants/constants.ts";
import {usePagination} from "./hooks/usePagination.ts";
import {useProductFiltering} from "./hooks/useProductFiltering.ts";
import {useCategoryNavigation} from "./hooks/useCategoryNavigation.ts";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, currentPage, itemsPerPage, sortField, sortOrder } = useAppSelector(
        (state) => state.products
    );

    const { categoryName } = useParams<{ categoryName?: string }>();
    const category = categoryName || CATEGORIES.ALL;

    useEffect(() => {
        dispatch(fetchProducts(category));
    }, [dispatch, category])

    const sortedAndFilteredProducts = useProductFiltering({ items, category, sortField, sortOrder });
    const { totalPages, startIndex, handlePageChange } = usePagination({ currentPage, totalItems: sortedAndFilteredProducts.length, itemsPerPage });

    const paginatedProducts = sortedAndFilteredProducts.slice(startIndex, startIndex + itemsPerPage);
    const handleCategoryChange = useCategoryNavigation();

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    }

    const handleSortChange = (field: SortField) => {
        const newOrder = sortField === field && sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC;
        dispatch(setSort({field, order: newOrder}));
    }

    if (loading) return <div className={style.loading}>Загрузка товаров...</div>;
    if (error) return <div className={style.error}>Ошибка: {error}</div>

    return (
        <div className={style.productList}>
            <Filters category={category} onCategoryChange={handleCategoryChange} />
            <Sorting sortField={sortField} sortOrder={sortOrder} onSortChange={handleSortChange} />

            <h2>Товары {category !== CATEGORIES.ALL ? `- ${CATEGORY_LABELS[category as Category] || category}` : ''}</h2>

            <div className={style.grid}>
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ProductList;