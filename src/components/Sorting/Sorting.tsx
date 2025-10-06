import React from 'react';
import style from "./Sorting.module.css";
import {CATEGORIES, SORT_FIELDS, SORT_ORDERS, type SortField, type SortOrder} from "../../constants/constants.ts";

interface SortingProps {
    sortField: SortField;
    sortOrder: SortOrder;
    onSortChange: (field: SortField) => void;
}

const Sorting: React.FC<SortingProps> = ({ sortField, sortOrder, onSortChange}) => {
    return (
        <div className={style.sorting}>
            <span>Сортировка: </span>
            <button
                className={sortField === CATEGORIES.ALL ? style.activeSort : style.sortButton}
                onClick={() => onSortChange(SORT_FIELDS.NAME)}
            >
                По названию {sortField === SORT_FIELDS.NAME && (sortOrder === SORT_ORDERS.ASC ? '↑' : '↓')}
            </button>
            <button
                className={sortField === SORT_FIELDS.PRICE ? style.activeSort : style.sortButton}
                onClick={() => onSortChange(SORT_FIELDS.PRICE)}
            >
                По цене {sortField === SORT_FIELDS.PRICE && (sortOrder === SORT_ORDERS.ASC ? '↑' : '↓')}
            </button>
        </div>
    );
};

export default Sorting;