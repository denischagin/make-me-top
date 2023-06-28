/**
 * Возвращает число по переданному параметру
 *
 * @example_1
 * stringToNumber("80px")
 *
 * @param { string } param "80px"
 *
 * @return { number } 80
 *
 * @example_2
 * stringToNumber("a80px")
 *
 * @param { string } param "a80px"
 *
 * @return { number } NaN
 *
 * @example_3
 * stringToNumber(true)
 *
 * @param { boolean } param true
 *
 * @return { number } 1
 */
export function stringToNumber(param: string | number | bigint | boolean | undefined | null): number {
    if (typeof param === 'boolean') {
        return Number(param);
    }

    if (typeof param === 'bigint') {
        return Number(param);
    }

    return parseInt(String(param));
}