import {useMemo} from "react";
import {CATEGORIES, SORT_FIELDS, SORT_ORDERS, type SortField, type SortOrder} from "../../../constants/constants.ts";
import type {Product} from "../../../types/product.ts";

interface UseProductFilteringProps {
    items: Product[];
    category: string;
    sortField: SortField;
    sortOrder: SortOrder;
}

export const useProductFiltering = ({ items, category, sortField, sortOrder }: UseProductFilteringProps) => {
    const sortedAndFilteredProducts = useMemo(() => {
        const filtered =
            category === CATEGORIES.ALL
                ? [...items]
                : items.filter(product => product.category === category);

        return filtered.sort((a, b) => {
            if (sortField === SORT_FIELDS.NAME) {
                return sortOrder === SORT_ORDERS.ASC
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                return sortOrder === SORT_ORDERS.ASC
                    ? a.price - b.price
                    : b.price - a.price;
            }
        });
    }, [items, category, sortField, sortOrder]);

    return sortedAndFilteredProducts;
}