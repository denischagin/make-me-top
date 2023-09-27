import {
    useEffect,
    useState,
} from 'react';

export const useDebounce = <T> (value: T, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    let timeout: NodeJS.Timeout;

    useEffect(() => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    return debounceValue;
};