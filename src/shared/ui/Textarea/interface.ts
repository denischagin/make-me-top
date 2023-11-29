import { AreaHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	fullwidth?: boolean;
	color?: textareaColors;
	size?: textareaSizes;
}

export enum textareaColors {
	black = 'black',
	white = 'white',
}

export enum textareaSizes {
	middle = 'middle',
	large = 'large',
}