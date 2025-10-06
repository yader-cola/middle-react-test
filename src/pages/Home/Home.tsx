import React from 'react';
import style from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={style.home}>
            <h2 className={style.title}>Добро пожаловать в наш магазин!</h2>
            <p className={style.subtitle}>Выберите категорию товаров в меню выше</p>
        </div>
    );
};

export default Home;