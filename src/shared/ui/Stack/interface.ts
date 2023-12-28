import { ComponentProps } from 'react';

export interface StackProps extends ComponentProps<'div'> {
    spacing?: stackSpacing;
    direction?: stackDirection;
    align?: stackAlign;
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

export enum stackAlign {
    center = 'center',
    left = 'left',
    right = 'right',
    stretch = 'stretch'
}