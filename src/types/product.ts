export interface Product {
    id: number;
    name: string;
    category: 'food' | 'clothes' | 'electronics';
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

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export type SortField = 'name' | 'price';
export type SortOrder = 'asc' | 'desc';