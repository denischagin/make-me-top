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

export const ExplorerUserInfo = () => {
    const [block, element] = bem('explorer-user-info');

    const userInfo = useAppSelector(userInfoSelector);

    const {
        name = '',
        avatar = '',
        rating,
        stars = 0,
    } = userInfo;

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.large}
                image={avatar}
                orbit
            />
            <div className={element('description')}>
                <Typography
                    variant={typographyVariant.h1}
                    className={element('description-name', 'mb-4')}
                >
                    {name}
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
                        value={stars}
                    />
                </div>
            </div>
        </div>
    );
};
