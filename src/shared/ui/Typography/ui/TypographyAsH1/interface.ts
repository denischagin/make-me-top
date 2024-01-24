import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsH1Props
    extends Omit<ComponentProps<'h1'>, 'color'>, TypographyCommonProps {
}

