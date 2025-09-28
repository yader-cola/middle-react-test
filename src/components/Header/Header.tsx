import React from 'react';
import style from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <h1 className={style.h1}>Performance Lab Store</h1>
            <nav className={style.nav}>
                <a className={style.navLink} href="/">Главная</a>
                <a className={style.navLink} href="/category/food">Еда</a>
                <a className={style.navLink} href="/category/clothes">Одежда</a>
                <a className={style.navLink} href="/category/electronics">Электроника</a>
            </nav>
        </header>
    );
};

export default Header;