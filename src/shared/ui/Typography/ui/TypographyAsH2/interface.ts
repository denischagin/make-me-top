import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsH2Props
    extends Omit<ComponentProps<'h2'>, 'color'>, TypographyCommonProps {
}

