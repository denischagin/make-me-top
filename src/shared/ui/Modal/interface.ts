import { ReactNode } from 'react';

export interface ReviewModalInterface {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean
    fullwidth?: boolean
}
