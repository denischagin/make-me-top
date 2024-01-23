import { ComponentProps } from 'react';

export type TypographyAsType = 'p' | 'span' | 'a'

export interface TypographyCommonProps {
    as?: TypographyAsType;
    variant?: typographyVariant;
    color?: typographyColor;
}

export interface TypographyAsParagraphProps
    extends Omit<ComponentProps<'p'>, 'color'>, TypographyCommonProps {
    as?: 'p';
    parseLink?: boolean;
}

export interface TypographyAsSpanProps
    extends Omit<ComponentProps<'span'>, 'color'>, TypographyCommonProps {
    as?: 'span';
}

export interface TypographyAsLinkProps
    extends Omit<ComponentProps<'a'>, 'color'>, TypographyCommonProps {
    as?: 'a';
    underline?: boolean;
}

export type TypographyProps = TypographyAsParagraphProps | TypographyAsSpanProps | TypographyAsLinkProps

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
