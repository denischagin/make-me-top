import { ComponentProps } from 'react';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsLinkProps
    extends Omit<ComponentProps<'a'>, 'color'>, TypographyCommonProps {
    as?: 'a';
    underline?: boolean;
}
