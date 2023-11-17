import { bem } from '@shared/utils/helpers/bem';

import { TypographyInterface } from './interfaces';

import './styles.scss';

export const Typography = (props: TypographyInterface) => {
    const { className, color, variant, ...restProps } = props;

    const [block, element] = bem('typography');

    return (
        <p
            {...restProps}
            className={block(
                {
                    color,
                    variant,
                },
                className,
            )}
        />
    );
};
