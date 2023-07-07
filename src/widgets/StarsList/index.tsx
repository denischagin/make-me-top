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

import { arrayOfStars } from './model';

import './styles.scss';

export const StarsList = (props: StarsListInterface) => {
    const {
        heading,
    } = props;

    const [block, element] = bem('stars-list');

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mt-5 mb-4')}
                variant={typographyVariant.h2}
            >
                {heading}
            </Typography>
            <div className={element('stars', 'mb-4')}>
                {
                    arrayOfStars.map((item) => (
                        <Star
                            color={starColor.primary500}
                            key={item.name}
                        >
                            <p className={element('label')}>
                                {item.name}
                            </p>
                            <div className={element('star-rating')}>
                                <Rating
                                    scoreColor={ratingScoreColor.white}
                                    rating={item.rate}
                                    size={ratingSize.small}
                                    starColor={ratingStarColor.white}
                                />
                            </div>
                        </Star>
                    ))
                }
            </div>
        </div>
    );
};
