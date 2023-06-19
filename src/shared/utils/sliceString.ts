/**
 * Возвращает обрезанную строку
 *
 * @example
 * sliceString("Шла Саша по шоссе и сосала сушку", 20)
 *
 * @param {string} str - строка
 * @param {string} maxLength - длина строки
 *
 * @return Шла Саша по шос…
 */
export function sliceString(str: string, maxLength: number) {
    if (str.length > maxLength) {
        return `${str.substring(0, maxLength)}…`;
    }

    return str;
}
