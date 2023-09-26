import { ReactNode } from 'react';

export interface TypographyInterface {
    children: ReactNode;
    variant: typographyVariant;
    color?: typographyColor;
    className?: string;
    onClick?: () => void;
}

export enum typographyColor {
    primary500 = 'primary-500',
    black = 'black',
    white = 'white',
}

export enum typographyVariant {
    h1 = 'h1',
    h2 = 'h2',
    medium16 = 'medium16',
    medium14 = 'medium14',
    regular16 = 'regular16',
    regular14 = 'regular14',
}