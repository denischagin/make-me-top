import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsSpanProps } from '@shared/ui/Typography/ui';

export const TypographyAsSpan = (props: TypographyAsSpanProps) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    return (
        <span
            {...restProps}
            className={className}
        >
            {children}
        </span>
    );
};