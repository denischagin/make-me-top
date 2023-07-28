import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Rating } from '@shared/Rating';
import { Star } from '@shared/Star';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { StarsListInterface } from './interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { starColor } from '@shared/Star/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const StarsList = (props: StarsListInterface) => {
    const {
        heading,
        stars,
    } = props;

    const [block, element] = bem('stars-list');

    return (
        <>
            {
                !!stars?.length &&
                <div className={block()}>
                    <Typography
                        className={element('heading', 'mt-5 mb-4')}
                        variant={typographyVariant.h2}
                    >
                        {heading}
                    </Typography><div className={element('stars', 'mb-4')}>
                        {stars?.map((star) => (
                            <Star
                                color={starColor.primary500}
                                key={star.courseId}
                            >
                                <p className={element('label')}>
                                    {star.title}
                                </p>
                                <div className={element('star-rating')}>
                                    <Rating
                                        scoreColor={ratingScoreColor.white}
                                        rating={star.rating}
                                        size={ratingSize.small}
                                        starColor={ratingStarColor.white}
                                    />
                                </div>
                            </Star>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};
