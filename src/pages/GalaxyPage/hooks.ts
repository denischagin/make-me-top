import { useEffect, useState } from 'react';

export const useGalaxyWindowSizeDebounce = () => {
    const [windowSizeDebounce, setWindowSizeDebounce] = useState(
        window.innerWidth,
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        const updateSize = () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                const innerWidth = window.innerWidth;
                setWindowSizeDebounce(innerWidth);
            }, 100);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            window.removeEventListener('resize', updateSize);
            clearTimeout(timeout);
        };
    }, []);

    return windowSizeDebounce;
};
