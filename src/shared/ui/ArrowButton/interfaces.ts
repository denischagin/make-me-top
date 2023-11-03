import { HTMLAttributes } from 'react';

export interface ArrowButtonInterface extends HTMLAttributes<HTMLDivElement> {
	direction: arrowButtonDirection;
	variant?: arrowButtonVariant;
}

export enum arrowButtonDirection {
	top = 'top',
	bottom = 'bottom',
	left = 'left',
	right = 'right',
}

export enum arrowButtonVariant {
	default = 'default',
	simple = 'simple',
}
