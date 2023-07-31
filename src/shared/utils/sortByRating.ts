export interface SortRatingInterface {
    rating: number;
}

export function sortByRating<D extends Array<SortRatingInterface>>(users: D) {
    // использование оператора spread для фикса Cannot assign to read only property '0' of object '[object Array]'
    return [...users].sort((a, b) => b.rating - a.rating);
}