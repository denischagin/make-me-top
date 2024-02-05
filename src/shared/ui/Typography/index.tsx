import { TypographyProps, TypographyPropsByAs } from './interfaces';

import './styles.scss';
import {
    TypographyAsH1,
    TypographyAsH2,
    TypographyAsH3,
    TypographyAsH4,
    TypographyAsLink,
    TypographyAsParagraph,
    TypographyAsSpan, TypographyAsStrong,
} from '@shared/ui/Typography/ui';
import { ComponentType } from 'react';

type TypographyComponentsType = {
    [key in keyof TypographyPropsByAs]: ComponentType<TypographyPropsByAs[key]>
}

export const Typography = (props: TypographyProps) => {
    const typographyByAs: TypographyComponentsType = {
        p: TypographyAsParagraph,
        span: TypographyAsSpan,
        a: TypographyAsLink,
        h1: TypographyAsH1,
        h2: TypographyAsH2,
        h3: TypographyAsH3,
        h4: TypographyAsH4,
        strong: TypographyAsStrong,
    };

    const TypographyComponent =
        typographyByAs[props.as ?? 'p'] as ComponentType<TypographyProps>;

    return <TypographyComponent {...props as TypographyProps} />;
};