import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

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

export const ExplorerUserInfo = () => {
    const [block, element] = bem('explorer-user-info');

    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        person: {
            firstName,
            lastName,
            patronymic,
        },
        rating,
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
                <Typography
                    variant={typographyVariant.h1}
                    className={element('description-name', 'mb-4')}
                >
                    {userFullName}
                </Typography>
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
                        title="Кол-во освоенных звёзд"
                        value={totalSystems}
                    />
                </div>
            </div>
        </div>
    );
};
