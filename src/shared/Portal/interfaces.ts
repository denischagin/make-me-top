import { ReactNode } from 'react';

export interface PortalInterface {
    children: ReactNode;
    target: HTMLElement | DocumentFragment;
}
