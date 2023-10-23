import { useEffect } from 'react';

export interface UseEscModalArgs {
    isOpen: boolean;
    handleClose: () => void;
}

export const useEscModal = ({ handleClose: handleEsc, isOpen }: UseEscModalArgs) => {
    useEffect(() => {
        const handleEscClick = (e: KeyboardEvent) => {
            if (e.code !== 'Escape') return;

            handleEsc();
        };

        if (isOpen) addEventListener('keydown', handleEscClick);

        return () => removeEventListener('keydown', handleEscClick);
    }, [isOpen]);
};
