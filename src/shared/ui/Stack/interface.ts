import { ComponentProps } from 'react';

export interface StackProps extends ComponentProps<'div'> {
    spacing?: stackSpacing;
    direction?: stackDirection;
}

export enum stackSpacing {
    small = 'small',
    medium = 'medium',
    large = 'large',
    largest = 'largest',
}

export enum stackDirection {
    horizontal = 'horizontal',
    vertical = 'vertical',
}