import { ComponentProps } from 'react';
import { TypographyCommonProps, GetTypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsParagraphProps
    extends GetTypographyCommonProps<"p"> {
    as?: 'p';
    parseLink?: boolean;
}
