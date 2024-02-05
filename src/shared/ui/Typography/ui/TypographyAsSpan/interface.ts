import { ComponentProps } from 'react';
import { TypographyCommonProps, GetTypographyCommonProps } from '@shared/ui/Typography/interfaces';

export interface TypographyAsSpanProps
    extends GetTypographyCommonProps<"span"> {
    as?: 'span';
}
