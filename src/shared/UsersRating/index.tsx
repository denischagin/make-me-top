import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Avatar } from '@shared/Avatar';
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

import { UserInfoInterface } from '@shared/types/common';

import './styles.scss';

export const UsersRating = (props: UserInfoInterface) => {
    const {
        fullname,
        rating,
    } = props;

    const [block, element] = bem('rating-info');

    return (
        <div className={block()}>
            <span className={element('user-info')}>
                <Avatar size={avatarSize.small} />
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('user-name')}
                >
                    {fullname}
                </Typography>
            </span>
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
