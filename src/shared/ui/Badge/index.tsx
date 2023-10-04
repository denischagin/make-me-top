import { bem } from '@shared/utils/helpers/bem';

import { BadgeInterface } from './interfaces';

import './styles.scss';

export const Badge = (props: BadgeInterface) => {
    const {
        color,
        children,
    } = props;

    const [block, element] = bem('badge');

    return (
        <span
            className={block({
                color,
            })}
        >
            {children}
        </span>
    );
};
