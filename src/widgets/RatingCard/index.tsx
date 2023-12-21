import { Card } from '@shared/ui/Card';
import { DividingLine } from '@shared/ui/DividingLine';
import { Typography } from '@shared/ui/Typography';
import { UsersRating } from '@shared/ui/UsersRating';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { sortByRating } from '@shared/utils/helpers/sortByRating';

import { buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { Button } from '@shared/ui/Button';
import { NavLink } from 'react-router-dom';
import { URL_EXPLORERS } from '@shared/constants/links';

export const RatingCard = () => {
    const [block, element] = bem('rating-card');
    const limitElements = 9;

    const { data: userInfo, isSuccess } = useGetExplorerProfileQuery();

    if (!isSuccess) return null;

    const { ratingTable } = userInfo;

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
                {sortByRating(ratingTable)
                    ?.slice(0, limitElements)
                    .map((user) => (
                        <UsersRating
                            key={user.personId}
                            fullname={getUserFullName(user)}
                            rating={user.rating}
                        />
                    ))}

                <NavLink to={URL_EXPLORERS}>
                    <Button title={'Показать ещё'} size={buttonSize.large} />
                </NavLink>
            </div>
        </Card>
    );
};
