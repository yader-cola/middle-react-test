import type {Category, SortField, SortOrder} from "../constants/constants.ts";

export interface Product {
    id: number;
    name: string;
    category: Category;
    price: number;
    description: string;
}

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    sortField: SortField;
    sortOrder: SortOrder;
}

export interface CartItemType {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItemType[];
}