import { ReactComponent as ShineSmallIcon } from '@shared/images/shine18.svg';
import { ReactComponent as ShineBigIcon } from '@shared/images/shine24.svg';

import { bem } from '@shared/utils/helpers/bem';

import { ShiningStarProps } from './interfaces';

import './styles.scss';

export const ShiningStar = (props: ShiningStarProps) => {
    const { size } = props;

    const [block, element] = bem('shining-star');

    return (
        <>
            {size === 'small' ? (
                <ShineSmallIcon className={block()} />
            ) : (
                <ShineBigIcon className={block()} />
            )}
        </>
    );
};
