import React from 'react';
import style from './Filters.module.css';

interface FiltersProps {
    category: string;
    onCategoryChange: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ category, onCategoryChange }) => {
    return (
        <div className={style.filters}>
            <button className={category === 'all' ? style.activeFilter : style.filterButton} onClick={() => onCategoryChange('all')}>
                Все товары
            </button>
            <button className={category === 'food' ? style.activeFilter : style.filterButton} onClick={() => onCategoryChange('food')}>
                Еда
            </button>
            <button className={category === 'clothes' ? style.activeFilter : style.filterButton} onClick={() => onCategoryChange('clothes')}>
                Одежда
            </button>
            <button className={category === 'electronics' ? style.activeFilter : style.filterButton} onClick={() => onCategoryChange('electronics')}>
                Электроника
            </button>
        </div>
    );
};

export default Filters;