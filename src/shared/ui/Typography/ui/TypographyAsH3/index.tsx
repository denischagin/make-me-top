import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsH3Props } from '@shared/ui/Typography/ui';

export const TypographyAsH3 = (props: TypographyAsH3Props) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    return (
        <h3
            {...restProps}
            className={className}
        >
            {children}
        </h3>
    );
};
