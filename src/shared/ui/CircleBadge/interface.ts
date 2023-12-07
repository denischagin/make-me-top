import { ReactNode } from 'react';

export interface CircleBadgeProps {
    badgeContent?: number;
    children: ReactNode;
    emptyContent?: boolean;
}