import { ReactNode } from 'react';

export interface ModalInterface {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean;
    fullwidth?: boolean;
    position?: modalPosition;
    closeOnBackground?: boolean;
}

export enum modalPosition {
    top = 'top',
    center = 'center'
}
