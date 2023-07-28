import { useAppSelector } from '@app/providers/store/hooks';

import { keeperInfoSelector } from '@entities/keeper/model/selectors';

import { Avatar } from '@shared/Avatar';
import { InfoCard } from '@shared/InfoCard';
import { Rating } from '@shared/Rating';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { avatarSize } from '@shared/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const KeeperUserInfo = () => {
    const [block, element] = bem('keeper-user-info');

    const userInfo = useAppSelector(keeperInfoSelector);

    const {
        person,
        rating,
        totalExplorers,
        totalSystems,
    } = userInfo;

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.large}
                orbit
            />
            <div className={element('description')}>
                <Typography
                    className={element('description-name', 'mb-4')}
                    variant={typographyVariant.h1}
                >
                    {getUserFullName(person)}
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
                        title="Кол-во планет"
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
