import {memo} from 'react';
import type {CartItemType} from '../../types/product';
import style from "./CartItem.module.css";

interface CartItemProps {
    item: CartItemType;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onRemove: (productId: number) => void;
}

const CartItem = memo(({item, onIncrease, onDecrease, onRemove}: CartItemProps) => {

    console.log(`Rendering CartItem ${item.product.name}`);
    return (
        <div className={style.cartItem}>
            <div className={style.itemInfo}>
                <h4>{item.product.name}</h4>
                <p>{item.product.price} Р x {item.quantity}</p>
                <div className={style.itemTotal}>
                    Итого: {item.product.price * item.quantity} Р
                </div>
            </div>
            <div className={style.itemActions}>
                <div className={style.quantityControls}>
                    <button className={style.quantityButton} onClick={() => onDecrease(item.product.id)}>
                        -
                    </button>
                    <span className={style.quantity}>{item.quantity}</span>
                    <button className={style.quantityButton} onClick={() => onIncrease(item.product.id)}>
                        +
                    </button>
                </div>
                <button className={style.removeButton} onClick={() => onRemove(item.product.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
});

CartItem.displayName = 'CartItem';

export default CartItem;