import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsH3Props
    extends Omit<ComponentProps<'h3'>, 'color'>, TypographyCommonProps {
}

