export interface SortRatingInterface {
    rating: number;
}

/**
 * Возвращает отсортированный массив по рейтингу
 *
 * @example
 * sortByRating(usersList)
 *
 * @param {string} users - массив пользователей с полем rating
 *
 */

export function sortByRating<D extends Array<SortRatingInterface>>(users: D | undefined | null) {
    if (users) {
        // использование оператора spread для фикса Cannot assign to read only property '0' of object '[object Array]'
        return [...users].sort((a, b) => b.rating - a.rating);
    }

    return [];
}