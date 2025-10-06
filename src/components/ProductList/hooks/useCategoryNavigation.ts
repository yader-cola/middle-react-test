import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks.ts";
import {CATEGORIES} from "../../../constants/constants.ts";
import {setCurrentPage} from "../../../store/slices/productSlice/productsSlice.ts";

export const useCategoryNavigation = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCategoryChange = (newCategory: string) => {
        if (newCategory === CATEGORIES.ALL) {
            navigate('/category');
        } else {
            navigate(`/category/${newCategory}`);
        }
        dispatch(setCurrentPage(1));
    }

    return handleCategoryChange;
}