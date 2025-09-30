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
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}