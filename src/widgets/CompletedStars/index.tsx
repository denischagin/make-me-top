import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Rating } from '@shared/Rating';
import { Star } from '@shared/Star';

import { bem } from '@shared/utils/bem';

import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { starColor } from '@shared/Star/interfaces';

import { COMPLETED_STARS_LIST } from './model';

import './styles.scss';

export const CompletedStars = () => {
    const [block, element] = bem('completed-stars');

    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        investigatedSystems,
    } = userInfo;

    return (
        <div className={block()}>
            {investigatedSystems?.map((item) => (
                <Star
                    color={starColor.primary500}
                    key={item.courseId}
                >
                    <p className={element('label')}>
                        {item.title}
                    </p>
                    <div className={element('star-rating')}>
                        <Rating
                            scoreColor={ratingScoreColor.black}
                            rating={item.value}
                            size={ratingSize.small}
                            starColor={ratingStarColor.primary500}
                        />
                    </div>
                </Star>
            ))}
        </div>
    );
};
