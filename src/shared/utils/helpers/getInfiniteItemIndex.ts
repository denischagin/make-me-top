export interface GetInfiniteItemIndexParams {
    pageIndex: number,
    size: number,
    itemIndex: number
}

export const getInfiniteItemIndex = ({ pageIndex, itemIndex, size }: GetInfiniteItemIndexParams) => {
    return pageIndex * size + itemIndex;
};