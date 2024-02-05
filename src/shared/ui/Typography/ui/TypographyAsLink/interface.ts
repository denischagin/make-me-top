import { ComponentProps } from 'react';
import { TypographyCommonProps, GetTypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsLinkProps
    extends  GetTypographyCommonProps<"a"> {
    as?: 'a';
    underline?: boolean;
}
