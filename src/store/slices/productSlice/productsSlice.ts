import type {ProductsState} from "../../../types/product.ts";
import {SORT_FIELDS, SORT_ORDERS, type SortField, type SortOrder} from "../../../constants/constants.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {fetchProducts} from "./thunks.ts";

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 6,
    sortField: SORT_FIELDS.NAME,
    sortOrder: SORT_ORDERS.ASC,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSort: (state, action: PayloadAction<{field: SortField; order: SortOrder}>) => {
            state.sortField = action.payload.field;
            state.sortOrder = action.payload.order;
        }
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

export const { setCurrentPage, setSort } = productsSlice.actions;
export default productsSlice.reducer;