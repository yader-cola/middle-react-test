import {createAsyncThunk} from "@reduxjs/toolkit";
import {CATEGORIES} from "../../../constants/constants.ts";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (category?: string) => {
        const url = category && category !== CATEGORIES.ALL
            ? `http://localhost:3001/products?category=${category}`
            : 'http://localhost:3001/products';

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    }
);