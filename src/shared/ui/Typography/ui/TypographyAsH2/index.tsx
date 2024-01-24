import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsH2Props } from '@shared/ui/Typography/ui';

export const TypographyAsH2 = (props: TypographyAsH2Props) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    return (
        <h2
            {...restProps}
            className={className}
        >
            {children}
        </h2>
    );
};
