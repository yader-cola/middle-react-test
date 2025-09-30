import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchProducts, setCurrentPage} from "../../store/slices/productsSlice";
import style from "./ProductList.module.css";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, currentPage, itemsPerPage } = useAppSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = items.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div className={style.loading}>Загрузка товаров...</div>;
    if (error) return <div className={style.error}>Ошибка: {error}</div>

    return (
        <div className={style.productList}>
            <h2>Товары</h2>

            <div className={style.grid}>
                {paginatedProducts.map((product) => (
                    <div key={product.id} className={style.productCard}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
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

export default ProductList;