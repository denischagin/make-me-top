import { TypographyAsLinkProps, typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils';

export const TypographyAsLink = (props: TypographyAsLinkProps) => {
    const [block] = bem('typography');
    const {
        className,
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        underline = true,
        ...restProps
    } = props;

    return (
        <a
            {...restProps}
            className={block(
                {
                    color,
                    variant,
                    underline,
                },
                className,
            )}
        >
            {children}
        </a>
    );
};