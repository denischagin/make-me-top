import { ReactNode } from 'react';

export interface CardWithExtraButtonProps {
    fullName: string;
    content: ReactNode;
    buttonContent: string;
    onButtonClick?: () => void;
    buttonHref?: string;
    active?: boolean;
    personId: number;
}