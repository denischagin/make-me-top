import { ReactNode } from 'react';

export type CircleBadgeProps = CircleBadgeEmptyContent | CircleBadgeWithContent

export interface CircleBadgeCommonProps {
    emptyContent: boolean;
    children: ReactNode;
}

export interface CircleBadgeEmptyContent extends CircleBadgeCommonProps {
    emptyContent: true;
    showBadge?: boolean;
}

export interface CircleBadgeWithContent extends CircleBadgeCommonProps {
    emptyContent: false;
    badgeContent?: string | number;
    showZero?: boolean;
}

