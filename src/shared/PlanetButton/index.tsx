import { bem } from '@shared/utils/bem';

import { PlanetButtonInterface } from './interfaces';

import './styles.scss';

export const PlanetButton = (props: PlanetButtonInterface) => {
    const {
        title,
        onClick,
        ...rest
    } = props;

    const [block, element] = bem('planet-button');

    return (
        <button
            {...rest}
            onClick={onClick}
            className={block()}
        >
            {title}
        </button>
    );
};
