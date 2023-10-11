import { useState } from 'react';
import { ReviewCard } from '@shared/ui/ReviewCard';
import { ShowMoreElemenetsButton } from '@shared/ui/ShowMoreElemenetsButton';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { buttonSize } from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { DEFAULT_EL_LIMIT } from './model';

import './styles.scss';
import { ReviewsProps } from '@widgets/Reviews/interfaces';

export const Reviews = ({ reviews }: ReviewsProps) => {
    const [block, element] = bem('reviews');
    const [limitElements, setElementsLimit] =
        useState<number>(DEFAULT_EL_LIMIT);

    const { feedback } = reviews;

    if (!feedback?.length) {
        return null;
    }

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Отзывы
            </Typography>
            <div className={element('cards')}>
                {feedback.slice(0, limitElements)?.map((item) => (
                    <ReviewCard key={item.courseId} review={item} />
                ))}
            </div>
            <ShowMoreElemenetsButton
                setElementsLimit={setElementsLimit}
                elementsLength={feedback.length}
                defaultElementsLimit={DEFAULT_EL_LIMIT}
                currentElementsLimit={limitElements}
                buttonSize={buttonSize.large}
            />
        </div>
    );
};
