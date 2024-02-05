import { ReactNode } from 'react';

export interface ModalInterface {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean
    fullwidth?: boolean
}
