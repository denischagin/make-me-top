import { ReactNode } from 'react';

export enum HomeworkRequestCardVariant {
    primary = 'primary',
    secondary = 'secondary',
}

export interface HomeworkRequestCardProps {
    username: string;
    content: string;
    variant?: HomeworkRequestCardVariant;
}