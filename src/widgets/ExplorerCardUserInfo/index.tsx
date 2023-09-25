import { useAppSelector } from '@app/providers/store/hooks';

import { explorerCardInfoSelector } from '@entities/explorer/model/selectors';

import { Avatar } from '@shared/ui/Avatar';
import { InfoCard } from '@shared/ui/InfoCard';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const ExplorerCardUserInfo = () => {
    const [block, element] = bem('explorer-card-user-info');

    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        person,
        rating,
        totalSystems,
        totalFeedback,
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
                        title="Отзывы"
                        value={totalFeedback}
                    />
                    <InfoCard
                        title="Кол-во освоенных систем"
                        value={totalSystems}
                    />
                </div>
            </div>
        </div>
    );
};
