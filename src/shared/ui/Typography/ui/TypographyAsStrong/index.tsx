import { TypographyAsStrongProps } from '@shared/ui/Typography/ui';
import { useTypographyClass } from '@shared/ui/Typography/libs';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

export const TypographyAsStrong = (props: TypographyAsStrongProps) => {
    const {
        as,
        color,
        variant = typographyVariant.medium16,
        children,
        ...restProps
    } = props;
    console.log(variant);

    const className = useTypographyClass({ ...props, modifiers: { as: 'strong' }, variant });

    return (
        <strong className={className} {...restProps}>
            {props.children}
        </strong>
    );
};