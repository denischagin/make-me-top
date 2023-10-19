import { bem } from '@shared/utils/helpers/bem';

import { ButtonInterface } from './interfaces';

import './styles.scss';

export const Button = (props: ButtonInterface) => {
    const {
        color,
        size,
        title,
        className,
        ...restProps
    } = props;

    const [block, element] = bem('button');

    return (
        <button
            {...restProps}
            className={block({
                color,
                size,
            }, className)}
        >
            {title}
        </button>
    );
};
