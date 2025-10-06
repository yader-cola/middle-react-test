import {useAppDispatch} from "../../../store/hooks.ts";
import {useEffect} from "react";
import {setCurrentPage} from "../../../store/slices/productSlice/productsSlice.ts";

interface UsePaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

export const usePagination = ({ currentPage, totalItems, itemsPerPage }: UsePaginationProps) => {
    const dispatch = useAppDispatch();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            dispatch(setCurrentPage(totalPages));
        }
    }, [currentPage, totalPages, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    return {
        totalPages,
        startIndex,
        handlePageChange,
    }
}