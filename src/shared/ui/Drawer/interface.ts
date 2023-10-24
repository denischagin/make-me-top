import { HTMLAttributes, ReactNode } from 'react';

export interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    drawerProps?: HTMLAttributes<HTMLDivElement>;
    drawerContentProps?: HTMLAttributes<HTMLDivElement>;
}
