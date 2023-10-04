import { bem } from '@shared/utils/helpers/bem';

import { ButtonInterface } from './interfaces';

import './styles.scss';

export const Button = (props: ButtonInterface) => {
    const {
        color,
        size,
        title,
        onClick,
        ...restProps
    } = props;

    const [block, element] = bem('button');

    return (
        <button
            {...restProps}
            onClick={onClick}
            className={block({
                color,
                size,
            })}
        >
            {title}
        </button>
    );
};
