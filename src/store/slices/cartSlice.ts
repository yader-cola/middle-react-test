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
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.product.id === action.payload);
            if (!item) return;
            item.quantity += 1;
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.product.id === action.payload);
            if (!item) return;
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(cartItem => cartItem.product.id !== action.payload);
            }
        }
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;