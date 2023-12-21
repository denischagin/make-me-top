export interface GetIsLastInfiniteElementParams {
    pageIndex: number;
    pageNumber: number;
    itemIndex: number;
    pageLength: number;
    indent: number;
}

export const getIsLastInfiniteElement = (params: GetIsLastInfiniteElementParams) => {
    const { pageIndex, pageLength, pageNumber, itemIndex, indent } = params;

    return (pageIndex === pageNumber && itemIndex === pageLength - 1 - indent);
};