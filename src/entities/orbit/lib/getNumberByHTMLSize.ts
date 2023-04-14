export const getNumberByHTMLSize = (size: string | number | undefined): number | undefined => {
    if (typeof size === "undefined") {
        return;
    }

    if (typeof size === "string") {
        return Number(size.slice(0, -2))
    }

    return Number(String(size).slice(0, -2))
}