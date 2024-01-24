import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsParagraphProps
    extends Omit<ComponentProps<'p'>, 'color'>, TypographyCommonProps {
    as?: 'p';
    parseLink?: boolean;
}
