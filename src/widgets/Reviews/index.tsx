import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@app/providers/store/hooks';

import {
    explorerCardInfoSelector,
    explorerIsExplorerSelector,
} from '@entities/explorer/model/selectors';

import { keeperCardInfoSelector } from '@entities/keeper/model/selectors';

import { Button } from '@shared/Button';
import { ReviewCard } from '@shared/ReviewCard';
import { ShowMoreElemenetsButton } from '@shared/ShowMoreElemenetsButton';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { buttonSize } from '@shared/Button/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import { DEFAULT_EL_LIMIT } from './model';

import './styles.scss';

export const Reviews = () => {
    const [block, element] = bem('reviews');
    const [limitElements, setElementsLimit] = useState<number>(DEFAULT_EL_LIMIT);

    const location = useLocation();

    const isExplorerRegex = /\/explorer\/[0-9]+/i;
    const reviews = isExplorerRegex.test(location.pathname)
        ? useAppSelector(explorerCardInfoSelector)
        : useAppSelector(keeperCardInfoSelector);

    const {
        feedback,
    } = reviews;

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
                {
                    feedback.slice(0, limitElements)?.map((item) => (
                        <ReviewCard
                            key={item.courseId}
                            review={item}
                        />
                    ))
                }
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
