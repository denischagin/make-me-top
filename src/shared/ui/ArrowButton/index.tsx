import { ReactComponent as ArrowIcon } from '@shared/images/arrow.svg';

import { bem } from '@shared/utils/helpers/bem';

import { ArrowButtonInterface } from './interfaces';

import './styles.scss';

export const ArrowButton = (props: ArrowButtonInterface) => {
    const {
        direction,
        onClick,
    } = props;

    const [block, element] = bem('arrow-button');

    return (
        <div
            onClick={onClick}
            className={block({
                direction,
            })}
        >
            <ArrowIcon className={element('arrow')} />
            <div className={element('circle')} />
        </div>
    );
};
