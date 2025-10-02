import React from 'react';
import style from "./Sorting.module.css";
import type {SortField} from "../../types/product";

interface SortingProps {
    sortField: SortField;
    sortOrder: 'asc' | 'desc';
    onSortChange: (field: SortField) => void;
}

const Sorting: React.FC<SortingProps> = ({ sortField, sortOrder, onSortChange}) => {
    return (
        <div className={style.sorting}>
            <span>Сортировка: </span>
            <button className={sortField === 'name' ? style.activeSort : style.sortButton} onClick={() => onSortChange('name')}>
                По названию {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button className={sortField === 'price' ? style.activeSort : style.sortButton} onClick={() => onSortChange('price')}>
                По цене {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
        </div>
    );
};

export default Sorting;