import { useEffect, useState } from 'react';

export const useGalaxyWindowSizeDebounce = () => {
    const [windowSizeDebounce, setWindowSizeDebounce] = useState(
        window.innerWidth,
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        const updateSize = () => {
            clearTimeout(timeout);

            const innerWidth = document.documentElement.clientWidth;

            timeout = setTimeout(() => {
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
