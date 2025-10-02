import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchProducts, setCurrentPage, setSort} from "../../store/slices/productsSlice";
import style from "./ProductList.module.css";
import {useNavigate, useParams} from "react-router-dom";
import type {Product, SortField} from "../../types/product.ts";
import {addToCart} from "../../store/slices/cartSlice.ts";
import Filters from "../Filters";
import Sorting from "../Sorting";
import Pagination from "../Pagination";
import ProductCard from "../ProductCard";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, currentPage, itemsPerPage, sortField, sortOrder } = useAppSelector(
        (state) => state.products
    );

    const { categoryName } = useParams<{ categoryName?: string }>();
    const category = categoryName || 'all';

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts(category));
    }, [dispatch, category])

    const sortedAndFilteredProducts = useMemo(() => {
        const filtered =
            category === 'all'
                ? [...items]
                : items.filter(product => product.category === category);

        return filtered.sort((a, b) => {
            if (sortField === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                return sortOrder === 'asc'
                    ? a.price - b.price
                    : b.price - a.price;
            }
        });
    }, [items, category, sortField, sortOrder]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedAndFilteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const totalFilteredPages = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalFilteredPages && totalFilteredPages > 0) {
            dispatch(setCurrentPage(totalFilteredPages));
        }
    }, [currentPage, totalFilteredPages, dispatch]);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    }

    const handleSortChange = (field: SortField) => {
        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSort({field, order: newOrder}));
    }

    const handleCategoryChange = (newCategory: string) => {
        if (newCategory === 'all') {
            navigate('/category');
        } else {
            navigate(`/category/${newCategory}`);
        }
        dispatch(setCurrentPage(1));
    }

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    if (loading) return <div className={style.loading}>Загрузка товаров...</div>;
    if (error) return <div className={style.error}>Ошибка: {error}</div>

    return (
        <div className={style.productList}>
            <Filters category={category} onCategoryChange={handleCategoryChange} />
            <Sorting sortField={sortField} sortOrder={sortOrder} onSortChange={handleSortChange} />

            <h2>Товары {category !== 'all' ? `- ${getCategoryName(category)}` : ''}</h2>

            <div className={style.grid}>
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalFilteredPages} onPageChange={handlePageChange} />
        </div>
    );
};

function getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
        food: 'Еда',
        clothes: 'Одежда',
        electronics: 'Электроника'
    };
    return names[category] || category;
}

export default ProductList;