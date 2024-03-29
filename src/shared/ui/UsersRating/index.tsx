import { Avatar } from '@shared/ui/Avatar';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { UserInfoInterface } from '@shared/types/common';

import './styles.scss';

export const UsersRating = (props: UserInfoInterface) => {
    const { fullname, rating, personId, avatarHash } = props;

    const [block, element] = bem('rating-info');

    return (
        <div className={block()}>
            <span className={element('user-info')}>
                <Avatar size={avatarSize.small} personId={personId} hash={avatarHash} />
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
                    systemColor={ratingSystemColor.primary500}
                />
            </span>
        </div>
    );
};
