import { ButtonHTMLAttributes } from "react";

export interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string;
    color?: buttonColor;
    size: buttonSize;
    onClick?: () => void;
}

export enum buttonColor {
    primary500 = 'primary-500',
    filled = 'filled',
    black = 'black',
}

export enum buttonSize {
    small = 'small',
    large = 'large',
}
