import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsH4Props } from '@shared/ui/Typography/ui';

export const TypographyAsH4 = (props: TypographyAsH4Props) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    return (
        <h4
            {...restProps}
            className={className}
        >
            {children}
        </h4>
    );
};
