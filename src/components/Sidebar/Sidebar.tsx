import React from 'react';
import {useAppSelector} from "../../store/hooks.ts";
import {useDispatch} from "react-redux";
import {removeFromCart, updateQuantity} from "../../store/slices/cartSlice.ts";
import style from "./Sidebar.module.css";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { items } = useAppSelector((state) => state.cart);

    const handleIncreaseQuantity = (productId: number) => {
        const item = items.find(item => item.product.id === productId);
        if (item) {
            dispatch(updateQuantity({productId, quantity: item.quantity + 1}));
        }
    };

    const handleDecreaseQuantity = (productId: number) => {
        const item = items.find(item => item.product.id === productId);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeFromCart(productId));
        }
    };

    const handleRemoveItem = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <>
            <div className={style.overlay} onClick={onClose} />

            <div className={style.sidebar}>

                <div className={style.header}>
                    <h2>Корзина</h2>
                    <button className={style.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={style.content}>
                    {items.length === 0 ? (
                        <div className={style.emptyCart}>
                            Корзина пуста
                        </div>
                    ) : (
                        <>
                            <div className={style.items}>
                                {items.map((item) => (
                                    <div key={item.product.id} className={style.cartItem}>
                                        <div className={style.itemInfo}>
                                            <h4>{item.product.name}</h4>
                                            <p>{item.product.price} Р x {item.quantity}</p>
                                            <div className={style.itemTotal}>
                                                Итого: {item.product.price * item.quantity} Р
                                            </div>
                                        </div>
                                        <div className={style.itemActions}>
                                            <div className={style.quantityControls}>
                                                <button className={style.quantityButton} onClick={() => handleDecreaseQuantity(item.product.id)}>
                                                    -
                                                </button>
                                                <span className={style.quantity}>{item.quantity}</span>
                                                <button className={style.quantityButton} onClick={() => handleIncreaseQuantity(item.product.id)}>
                                                    +
                                                </button>
                                            </div>
                                            <button className={style.removeButton} onClick={() => handleRemoveItem(item.product.id)}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={style.footer}>
                                <div className={style.total}>
                                    Общая сумма: <strong>{totalAmount} Р</strong>
                                </div>
                                <button className={style.checkoutButton}>
                                    Оформить заказ
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;