import {
    Dispatch,
    InputHTMLAttributes,
    SetStateAction,
} from 'react';

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
    variant?: inputVariantEnum,
    fullwidth?: boolean
}

export enum inputVariantEnum {
    rounded = 'rounded',
    default = 'default',
}
