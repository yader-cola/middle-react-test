import React from 'react';
import style from './ProductCard.module.css';
import type {Product} from '../../types/product';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard:React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className={style.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className={style.category}>Категория: {product.category}</div>
            <div className={style.price}>{product.price} Р</div>
            <button className={style.addButton} onClick={() => onAddToCart(product)}>
                В корзину
            </button>
        </div>
    );
};

export default ProductCard;