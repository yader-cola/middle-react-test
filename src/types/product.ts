export interface Product {
    id: number;
    name: string;
    category: 'food' | 'clothes' | 'electronics';
    price: number;
    description: string;
}