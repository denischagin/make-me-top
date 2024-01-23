import { bem } from '@shared/utils/helpers/bem';

import { CardInterface } from './interfaces';

import './styles.scss';

export const Card = (props: CardInterface) => {
    const {
        size,
        glow,
        className,
        ...restProps
    } = props;

    const [block, element] = bem('card');

    return (
        <div
            {...restProps}
            className={block({
                size,
                glow,
            }, className)}
        />
    );
};
