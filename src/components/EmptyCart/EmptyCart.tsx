import React from 'react';
import style from './EmptyCart.module.css';

interface EmptyCartProps {
    onClose: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onClose }) => {
    return (
        <div className={style.emptyCart}>
            🛒 Корзина пуста
            <p>Добавьте товары из каталога</p>
            <button className={style.continueShopping} onClick={onClose}>
                Продолжить покупки
            </button>
        </div>
    );
};

export default EmptyCart;