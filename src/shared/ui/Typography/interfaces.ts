import {
    TypographyAsH1Props,
    TypographyAsH2Props,
    TypographyAsH3Props,
    TypographyAsH4Props,
    TypographyAsLinkProps,
    TypographyAsParagraphProps,
    TypographyAsSpanProps, TypographyAsStrongProps,
} from '@shared/ui/Typography/ui';
import { ComponentProps, JSX, JSXElementConstructor } from 'react';

export type GetTypographyCommonProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>
    = Omit<ComponentProps<T>, 'color'> & TypographyCommonProps


export type TypographyPropsByAs = {
    'p': TypographyAsParagraphProps,
    'a': TypographyAsLinkProps,
    'span': TypographyAsSpanProps,
    'h1': TypographyAsH1Props,
    'h2': TypographyAsH2Props,
    'h3': TypographyAsH3Props,
    'h4': TypographyAsH4Props,
    'strong': TypographyAsStrongProps,
}

export type TypographyAsType = keyof TypographyPropsByAs

export type TypographyProps = TypographyPropsByAs[TypographyAsType]

export interface TypographyCommonProps {
    as?: TypographyAsType;
    variant?: typographyVariant;
    color?: typographyColor;
}


export enum typographyColor {
    primary500 = 'primary-500',
    black = 'black',
    white = 'white',
}

export enum typographyVariant {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    medium16 = 'medium16',
    medium14 = 'medium14',
    regular16 = 'regular16',
    regular14 = 'regular14',
}
