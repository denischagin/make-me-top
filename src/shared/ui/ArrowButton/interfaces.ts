import { HTMLAttributes } from 'react';

export interface ArrowButtonInterface extends HTMLAttributes<HTMLDivElement> {
    direction: arrowButtonDirection;
}

export enum arrowButtonDirection {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
}
