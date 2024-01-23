import { TypographyAsSpanProps, typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils';

export const TypographyAsSpan = (props: TypographyAsSpanProps) => {
    const [block] = bem('typography');

    const {
        className,
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;

    return (
        <span
            {...restProps}
            className={block(
                {
                    color,
                    variant,
                },
                className,
            )}
        >
            {children}
        </span>
    );
};