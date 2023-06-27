export interface ButtonInterface {
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
