import { useEffect, useState } from 'react';

export const useInfinite = <T>(elements: T[] | undefined, pageIndex: number): T[][] => {
    const [infiniteElements, setInfiniteElements] = useState<T[][]>([]);

    useEffect(() => {
        setInfiniteElements((prev) => {
            const newState = [...prev];
            newState[pageIndex] = [...elements ?? []];
            return newState;
        });
    }, [elements]);

    return infiniteElements;
};