import {  typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsLinkProps } from '@shared/ui/Typography/ui';

export const TypographyAsLink = (props: TypographyAsLinkProps) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        underline = true,
        ...restProps
    } = props;
    const className = useTypographyClass({
        ...props, modifiers: {
            underline,
        },
    });

    return (
        <a
            {...restProps}
            className={className}
        >
            {children}
        </a>
    );
};