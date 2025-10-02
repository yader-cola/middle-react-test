import React, {useState} from 'react';
import style from "./Header.module.css";
import {useAppSelector} from "../../store/hooks.ts";
import Sidebar from "../Sidebar";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className={style.header}>
                <h1 className={style.h1}>Performance Lab Store</h1>
                <nav className={style.nav}>
                    <Link className={style.navLink} to="/">Главная</Link>
                    <Link className={style.navLink} to="/category/food">Еда</Link>
                    <Link className={style.navLink} to="/category/clothes">Одежда</Link>
                    <Link className={style.navLink} to="/category/electronics">Электроника</Link>

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