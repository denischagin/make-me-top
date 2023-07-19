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

import { arrayOfStars } from './model';

import './styles.scss';

export const StarsList = (props: StarsListInterface) => {
    const {
        heading,
    } = props;

    const [block, element] = bem('stars-list');

    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        investigatedSystems,
    } = userInfo;

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
                    investigatedSystems?.length ?
                        investigatedSystems?.map((item) => (
                            <Star
                                color={starColor.primary500}
                                key={item.courseId}
                            >
                                <p className={element('label')}>
                                    {item.title}
                                </p>
                                <div className={element('star-rating')}>
                                    <Rating
                                        scoreColor={ratingScoreColor.white}
                                        rating={item.value}
                                        size={ratingSize.small}
                                        starColor={ratingStarColor.white}
                                    />
                                </div>
                            </Star>
                        )) :
                        <Typography
                            className={element('heading')}
                            variant={typographyVariant.regular16}
                        >
                            Нет звёзд
                        </Typography>
                }
            </div>
        </div>
    );
};
