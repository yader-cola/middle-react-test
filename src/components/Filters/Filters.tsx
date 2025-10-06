import React from 'react';
import style from './Filters.module.css';
import {CATEGORY_LABELS, type Category} from "../../constants/constants.ts";

interface FiltersProps {
    category: string;
    onCategoryChange: (category: Category) => void;
}

const Filters: React.FC<FiltersProps> = ({ category, onCategoryChange }) => {
    return (
        <div className={style.filters}>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                    key={key}
                    className={category === key ? style.activeFilter : style.filterButton}
                    onClick={() => onCategoryChange(key as Category)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default Filters;