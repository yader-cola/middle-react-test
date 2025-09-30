import type { ProductsState } from "../../types/product";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:3001/products');
        if(!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    }
);

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 6,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder)=> {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error  = action.error.message || 'Something went wrong.';
            });
    },
});

export const { setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;