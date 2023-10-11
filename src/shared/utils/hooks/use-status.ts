import { useEffect } from 'react';

export const useStatus = (onStatusChange: () => void, status: boolean) => {
    useEffect(() => {
        if (!status) return;

        onStatusChange();
    }, [status]);
};

