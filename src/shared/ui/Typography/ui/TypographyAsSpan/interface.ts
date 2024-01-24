import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsSpanProps
    extends Omit<ComponentProps<'span'>, 'color'>, TypographyCommonProps {
    as?: 'span';
}
