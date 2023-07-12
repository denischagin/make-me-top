import { useAppSelector } from '@app/providers/store/hooks';

import { curatorInfoSelector } from '@entities/curator/model/selectors';

import { Avatar } from '@shared/Avatar';
import { InfoCard } from '@shared/InfoCard';
import { Rating } from '@shared/Rating';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { avatarSize } from '@shared/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const CuratorCardUserInfo = () => {
    const [block, element] = bem('curator-card-user-info');

    const userInfo = useAppSelector(curatorInfoSelector);

    const {
        person: {
            firstName,
            lastName,
            patronymic,
        },
        rating,
        totalExplorers,
        totalSystems,
    } = userInfo;

    const userFullName = `${lastName} ${firstName} ${patronymic}`;

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.large}
                orbit
            />
            <div className={element('description')}>
                <div className={element('description-name', 'mb-4')}>
                    <Typography variant={typographyVariant.h1}>
                        {userFullName}
                    </Typography>
                </div>
                <div className={element('cards')}>
                    <InfoCard
                        title="Рейтинг"
                        value={
                            <Rating
                                scoreColor={ratingScoreColor.white}
                                rating={rating}
                                size={ratingSize.large}
                                starColor={ratingStarColor.primary500}
                            />
                        }
                    />
                    <InfoCard
                        title="Кол-во звёзд"
                        value={totalSystems}
                    />
                    <InfoCard
                        title="Кол-во исследователей"
                        value={totalExplorers}
                    />
                </div>
            </div>
        </div>
    );
};
