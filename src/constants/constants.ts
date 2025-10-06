export const CATEGORIES = {
    ALL: "all",
    FOOD: "food",
    CLOTHES: "clothes",
    ELECTRONICS: "electronics",
} as const;

export const CATEGORY_LABELS = {
    [CATEGORIES.ALL]: "Все товары",
    [CATEGORIES.FOOD]: "Еда",
    [CATEGORIES.CLOTHES]: "Одежда",
    [CATEGORIES.ELECTRONICS]: "Электроника",
} as const;

export const SORT_ORDERS = {
    ASC: "asc",
    DESC: "desc",
} as const;

export const SORT_FIELDS = {
    NAME: "name",
    PRICE: "price",
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
export type SortOrder = typeof SORT_ORDERS[keyof typeof SORT_ORDERS];
export type SortField = typeof SORT_FIELDS[keyof typeof SORT_FIELDS];