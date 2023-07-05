import {
    Dispatch,
    InputHTMLAttributes,
    SetStateAction,
} from 'react';

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
    setStateOnChange?: Dispatch<SetStateAction<string>>
}
