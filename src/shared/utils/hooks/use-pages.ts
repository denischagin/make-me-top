import { useState } from 'react';

export interface UsePagesReturn {
    pageNumber: number;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
    size: number;
}

export const usePages = (initPage: number, sizePerPage: number): UsePagesReturn => {
    const [pageNumber, setPageNumber] = useState(initPage);

    const nextPage = () => {
        setPageNumber(prevState => prevState + 1);
    };

    const prevPage = () => {
        setPageNumber(prevState => prevState - 1);
    };


    return ({
        pageNumber,
        nextPage,
        prevPage,
        setPage: setPageNumber,
        size: sizePerPage,
    });
};