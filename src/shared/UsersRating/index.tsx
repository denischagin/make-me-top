import { Avatar } from '@shared/Avatar';
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

import { UserInfoInterface } from '@shared/types/common';

import './styles.scss';

export const UsersRating = (props: UserInfoInterface) => {
    const {
        user: {
            name = '',
            avatar = '',
            rating = 0,
        },
    } = props;

    const [block, element] = bem('rating-info');

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.small}
                image={avatar}
            />
            <Typography
                variant={typographyVariant.regular14}
                className={element('user-name')}
            >
                {name}
            </Typography>
            <span className={element('user-score')}>
                <Rating
                    rating={rating}
                    size={ratingSize.medium}
                    scoreColor={ratingScoreColor.white}
                    starColor={ratingStarColor.primary500}
                />
            </span>
        </div>
    );
};
