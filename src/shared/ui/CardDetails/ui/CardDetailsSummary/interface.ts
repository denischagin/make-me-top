import { ComponentProps } from 'react';
import { CardInterface } from '@shared/ui/Card/interfaces';

export interface CardDetailsSummaryProps extends ComponentProps<'div'> {
    cardProps?: CardInterface;
    isActive?: boolean;
}