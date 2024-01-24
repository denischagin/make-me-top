import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsH4Props
    extends Omit<ComponentProps<'h4'>, 'color'>, TypographyCommonProps {
}

