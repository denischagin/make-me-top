import { bem } from '@shared/utils/helpers/bem';

import { TypographyInterface } from './interfaces';

import './styles.scss';

export const Typography = (props: TypographyInterface) => {
    const { className, color, variant, children, onClick } = props;

    const [block, element] = bem('typography');

    return (
        <div
            onClick={onClick}
            className={block({
                color,
                variant,
            })}
        >
            <div className={className}>{children}</div>
        </div>
    );
};
