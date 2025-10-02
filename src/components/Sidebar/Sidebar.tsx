import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {decrementQuantity, incrementQuantity, removeFromCart} from "../../store/slices/cartSlice.ts";
import style from "./Sidebar.module.css";
import CartItem from "../CartItem";
import EmptyCart from "../EmptyCart";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.cart);

    console.log('Rendering Sidebar');

    const handleIncreaseQuantity = useCallback((productId: number) => {
        dispatch(incrementQuantity(productId));
    }, [dispatch]);

    const handleDecreaseQuantity = useCallback((productId: number) => {
        dispatch(decrementQuantity(productId));
    }, [dispatch]);

    const handleRemoveItem = useCallback((productId: number) => {
        dispatch(removeFromCart(productId));
    }, [dispatch]);

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
                        <EmptyCart onClose={onClose} />
                    ) : (
                        <>
                            <div className={style.items}>
                                {items.map((item) => (
                                    <CartItem
                                        key={item.product.id}
                                        item={item}
                                        onIncrease={handleIncreaseQuantity}
                                        onDecrease={handleDecreaseQuantity}
                                        onRemove={handleRemoveItem}
                                    />
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