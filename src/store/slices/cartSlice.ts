import type {CartState} from "../../types/product";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Product} from "../../types/product";

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                item => item.product.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    product: action.payload,
                    quantity: 1,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{productId: number; quantity: number; operation?: 'increment' | 'decrement'}>) => {
            const item = state.items.find(item => item.product.id === action.payload.productId);

            if (!item) return;

            if (action.payload.operation === 'increment') {
                item.quantity += action.payload.quantity;
            } else if (action.payload.operation === 'decrement') {
                item.quantity = Math.max(1, item.quantity - action.payload.quantity);
            } else {
                item.quantity = action.payload.quantity;
            }
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;