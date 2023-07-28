import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@app/providers/store/hooks';

import {
    explorerCardInfoSelector,
    explorerIsExplorerSelector,
} from '@entities/explorer/model/selectors';

import { keeperCardInfoSelector } from '@entities/keeper/model/selectors';

import { Button } from '@shared/Button';
import { ReviewCard } from '@shared/ReviewCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { buttonSize } from '@shared/Button/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const Reviews = () => {
    const [block, element] = bem('reviews');

    const location = useLocation();

    const isExplorerRegex = /\/explorer\/[0-9]+/i;
    const reviews = isExplorerRegex.test(location.pathname)
        ? useAppSelector(explorerCardInfoSelector)
        : useAppSelector(keeperCardInfoSelector);


    const {
        feedback,
    } = reviews;

    return (
        <>
            {
                !!feedback?.length &&
                <div className={block()}>
                    <Typography
                        className={element('heading', 'mb-4 mt-5')}
                        variant={typographyVariant.h2}
                    >
                        Отзывы
                    </Typography>
                    <div className={element('cards')}>
                        {
                            feedback?.map((item) => (
                                <ReviewCard
                                    key={item.courseId}
                                    review={item}
                                />
                            ))
                        }
                    </div>
                    <div className={element('button', 'mt-5')}>
                        <Button
                            title="Показать ещё"
                            size={buttonSize.large}
                        />
                    </div>
                </div>
            }
        </>
    );
};
