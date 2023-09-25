import { bem } from '@shared/utils/bem';

import { CardInterface } from './interfaces';

import './styles.scss';

export const Card = (props: CardInterface) => {
    const {
        size,
        children,
        glow,
    } = props;

    const [block, element] = bem('card');

    return (
        <div
            className={block({
                size,
                glow,
            })}
        >
            {children}
        </div>
    );
};
