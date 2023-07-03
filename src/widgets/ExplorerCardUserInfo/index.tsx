import { useAppSelector } from '@app/providers/store/hooks';

import { userInfoSelector } from '@entities/user/model/selectors';

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

export const ExplorerCardUserInfo = () => {
    const [block, element] = bem('explorer-card-user-info');

    const userInfo = useAppSelector(userInfoSelector);

    const {
        name = '',
        avatar = '',
        rating = 0,
        stars = 0,
        reviews = 0,
    } = userInfo;

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.large}
                image={avatar}
                orbit
            />
            <div className={element('description')}>
                <div className={element('description-name', 'mb-4')}>
                    <Typography variant={typographyVariant.h1}>
                        {name}
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
                        title="Отзывы"
                        value={reviews}
                    />
                    <InfoCard
                        title="Кол-во освоенных звёзд"
                        value={stars}
                    />
                </div>
            </div>
        </div>
    );
};
