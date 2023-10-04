import { ReactComponent as SystemIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/helpers/bem';

import { RatingInterface } from './interfaces';

import './styles.scss';

export const Rating = (props: RatingInterface) => {
    const {
        systemColor,
        scoreColor,
        size,
        rating,
        reflect,
    } = props;

    const [block, element] = bem('rating');

    const emptyRating = '—';
    const score = rating ? rating.toFixed(1) : emptyRating;

    return (
        <div className={block()}>
            {!reflect && (
                <SystemIcon
                    className={element('system', {
                        color: systemColor,
                        size,
                    })}
                />
            )}
            <span
                className={element('score', {
                    color: scoreColor,
                    size,
                })}
            >
                {score}
            </span>
            {reflect && (
                <SystemIcon
                    className={element('system', {
                        color: systemColor,
                        size,
                    })}
                />
            )}
        </div>
    );
};
