import { useAppSelector } from '@app/providers/store/hooks';

import { keeperCardInfoSelector } from '@entities/keeper/model/selectors';

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
    ratingSystemColor,
} from '@shared/Rating/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const KeeperCardUserInfo = () => {
    const [block, element] = bem('keeper-card-user-info');

    const userInfo = useAppSelector(keeperCardInfoSelector);

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
                <div className={element('description-name', 'mb-4')}>
                    <Typography variant={typographyVariant.h1}>
                        {getUserFullName(person)}
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
                                systemColor={ratingSystemColor.primary500}
                            />
                        }
                    />
                    <InfoCard
                        title="Кол-во систем"
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
