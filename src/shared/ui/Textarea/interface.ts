import { AreaHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    fullwidth?: boolean
}