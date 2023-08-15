import { useState } from 'react';

import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { DividingLine } from '@shared/DividingLine';
import { ShowMoreElemenetsButton } from '@shared/ShowMoreElemenetsButton';
import { Typography } from '@shared/Typography';
import { UsersRating } from '@shared/UsersRating';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';
import { sortByRating } from '@shared/utils/sortByRating';

import { buttonSize } from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { DividingLineColor } from '@shared/DividingLine/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import { DEFAULT_LIMIT_ITEM } from './model';

import './styles.scss';

export const RatingCard = () => {
    const [block, element] = bem('rating-card');
    const [limitElements, setElementsLimit] = useState<number>(DEFAULT_LIMIT_ITEM);

    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        ratingTable,
    } = userInfo;


    return (
        <Card size={cardSize.large}>
            <div className={block()}>
                <Typography
                    variant={typographyVariant.medium16}
                    className={element('heading', 'mb-4')}
                >
                    Мой рейтинг
                </Typography>
                <UsersRating
                    fullname={getUserFullName(userInfo.person)}
                    rating={userInfo.rating}
                />
                <DividingLine color={DividingLineColor.opacitygray} />
                <Typography
                    variant={typographyVariant.medium16}
                    className={element('heading', 'mb-4')}
                >
                    Общий рейтинг
                </Typography>
                {
                    sortByRating(ratingTable)?.slice(0, limitElements).map((user) => (
                        <UsersRating
                            key={user.personId}
                            fullname={getUserFullName(user)}
                            rating={user.rating}
                        />
                    ))
                }
                <ShowMoreElemenetsButton
                    setElementsLimit={setElementsLimit}
                    elementsLength={ratingTable.length}
                    defaultElementsLimit={DEFAULT_LIMIT_ITEM}
                    currentElementsLimit={limitElements}
                    buttonSize={buttonSize.large}
                />
            </div>
        </Card>
    );
};
