import {
    TypographyAsLinkProps,
    TypographyAsParagraphProps,
    TypographyAsSpanProps,
    TypographyAsType,
    TypographyProps,
} from './interfaces';

import './styles.scss';
import { TypographyAsLink, TypographyAsParagraph, TypographyAsSpan } from '@shared/ui/Typography/ui';
import { ReactElement } from 'react';


export const Typography = (props: TypographyProps) => {
    const typographyByAs: Record<TypographyAsType, ReactElement> = {
        p: <TypographyAsParagraph {...props as TypographyAsParagraphProps} />,
        span: <TypographyAsSpan {...props as TypographyAsSpanProps} />,
        a: <TypographyAsLink {...props as TypographyAsLinkProps} />,
    };

    return typographyByAs[props.as ?? 'p'];
};
