import { Avatar } from '@shared/ui/Avatar';
import { InfoCard } from '@shared/ui/InfoCard';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { useAppSelector } from '@app/providers/store/hooks';

import { keeperCardInfoSelector } from '@entities/keeper/model/selectors';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const KeeperCardUserInfo = () => {
    const [block, element] = bem('keeper-card-user-info');

    const userInfo = useAppSelector(keeperCardInfoSelector);

    const { person, rating, totalExplorers, totalSystems } = userInfo;

    return (
        <div className={block()}>
            <Avatar size={avatarSize.large} orbit />
            <div className={element('description')}>
                <div className={element('description-name', 'mb-4')}>
                    <Typography variant={typographyVariant.h1}>
                        {getUserFullName(person)}
                    </Typography>
                </div>
                <div className={element('cards')}>
                    <InfoCard
                        title='Рейтинг'
                        value={
                            <Rating
                                scoreColor={ratingScoreColor.white}
                                rating={rating}
                                size={ratingSize.large}
                                systemColor={ratingSystemColor.primary500}
                            />
                        }
                    />
                    <InfoCard title='Кол-во систем' value={totalSystems} />
                    <InfoCard
                        title='Кол-во исследователей'
                        value={totalExplorers}
                    />
                </div>
            </div>
        </div>
    );
};
