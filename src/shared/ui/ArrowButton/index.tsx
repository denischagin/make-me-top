import { ReactComponent as ArrowIcon } from '@shared/images/arrow.svg';

import { bem } from '@shared/utils/helpers/bem';

import { ArrowButtonInterface } from './interfaces';

import './styles.scss';

export const ArrowButton = (props: ArrowButtonInterface) => {
    const { direction, className, ...restProps } = props;

    const [block, element] = bem('arrow-button');

    return (
        <div
            className={block(
                {
                    direction,
                },
                className,
            )}
            {...restProps}
        >
            <ArrowIcon className={element('arrow')} />
            <div className={element('circle')} />
        </div>
    );
};
