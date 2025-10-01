import React, {useState} from 'react';
import style from "./Header.module.css";
import {useAppSelector} from "../../store/hooks.ts";
import Sidebar from "../Sidebar";

const Header: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className={style.header}>
                <h1 className={style.h1}>Performance Lab Store</h1>
                <nav className={style.nav}>
                    <a className={style.navLink} href="/">Главная</a>
                    <a className={style.navLink} href="/category/food">Еда</a>
                    <a className={style.navLink} href="/category/clothes">Одежда</a>
                    <a className={style.navLink} href="/category/electronics">Электроника</a>

                    <div className={style.cartIcon} onClick={() => setIsCartOpen(true)}>
                        🛒 {totalItems > 0 && <span className={style.cartCount}>{totalItems}</span>}
                    </div>
                </nav>
            </header>

            <Sidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>

    );
};

export default Header;