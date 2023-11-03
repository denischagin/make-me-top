import { HTMLAttributes, ReactNode } from 'react';

export interface CardInterface extends HTMLAttributes<HTMLDivElement> {
    size: cardSize;
    glow?: boolean;
}

export enum cardSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
}
