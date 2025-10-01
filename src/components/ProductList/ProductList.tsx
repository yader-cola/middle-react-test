import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchProducts, setCurrentPage, setSort} from "../../store/slices/productsSlice";
import style from "./ProductList.module.css";
import {useSearchParams} from "react-router-dom";
import type {SortField} from "../../types/product.ts";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, currentPage, itemsPerPage, sortField, sortOrder } = useAppSelector(
        (state) => state.products
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') || 'all';

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, category])

    const sortedAndFilteredProducts = useMemo(() => {
        const filtered = category === 'all'
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

    const handleSortChange = (field: SortField) => {
        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSort({field, order: newOrder}));
    }

    const handleCategoryChange = (newCategory: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (newCategory === 'all') {
            newParams.delete('category');
        } else {
            newParams.set('category', newCategory);
        }
        newParams.delete('page');
        setSearchParams(newParams);
        dispatch(setCurrentPage(1));
    }

    if (loading) return <div className={style.loading}>Загрузка товаров...</div>;
    if (error) return <div className={style.error}>Ошибка: {error}</div>

    return (
        <div className={style.productList}>
            <div className={style.filters}>
                <button className={category === 'all' ? style.activeFilter : style.filterButton} onClick={() => handleCategoryChange('all')}>
                    Все товары
                </button>
                <button className={category === 'food' ? style.activeFilter : style.filterButton} onClick={() => handleCategoryChange('food')}>
                    Еда
                </button>
                <button className={category === 'clothes' ? style.activeFilter : style.filterButton} onClick={() => handleCategoryChange('clothes')}>
                    Одежда
                </button>
                <button className={category === 'electronics' ? style.activeFilter : style.filterButton} onClick={() => handleCategoryChange('electronics')}>
                    Электроника
                </button>
            </div>

            <div className={style.sorting}>
                <span>Сортировка: </span>
                <button className={sortField === 'name' ? style.activeSort : style.sortButton} onClick={() => handleSortChange('name')}>
                    По названию {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button className={sortField === 'price' ? style.activeSort : style.sortButton} onClick={() => handleSortChange('price')}>
                    По цене {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            <h2>Товары {category !== 'all' ? `- ${getCategoryName(category)}` : ''}</h2>

            <div className={style.grid}>
                {paginatedProducts.map((product) => (
                    <div key={product.id} className={style.productCard}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className={style.category}>Категория: {product.category}</div>
                        <div className={style.price}>{product.price} Р</div>
                        <button className={style.addButton} onClick={() => console.log('Add to cart:', product.id)}>
                            В корзину
                        </button>
                    </div>
                ))}
            </div>

            <div className={style.pagination}>
                <button disabled={currentPage === 1} onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
                    Назад
                </button>
                <span>Страница {currentPage}</span>
                <button disabled={paginatedProducts.length < itemsPerPage} onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
                    Вперед
                </button>
            </div>
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