import {  typographyVariant } from '@shared/ui/Typography/interfaces';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { TypographyAsH1Props } from '@shared/ui/Typography/ui';

export const TypographyAsH1 = (props: TypographyAsH1Props) => {
    const {
        color,
        variant = typographyVariant.regular14,
        children,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    return (
        <h1
            {...restProps}
            className={className}
        >
            {children}
        </h1>
    );
};
