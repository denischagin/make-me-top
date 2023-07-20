import { Avatar } from '@shared/Avatar';
import { Badge } from '@shared/Badge';
import { Rating } from '@shared/Rating';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { CurrentUserItemInterface } from './interfaces';
import { avatarSize } from '@shared/Avatar/interfaces';
import { badgeColor } from '@shared/Badge/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';

import './styles.scss';

export const CurrentUserItem = (props: CurrentUserItemInterface) => {
    const {
        badgeTitle,
        user: {
            person,
            rating,
        },
    } = props;

    const [block, element] = bem('current-user');

    return (
        <div className={block()}>
            <div className={element('item')}>
                <div className={element('user')}>
                    <Avatar size={avatarSize.small} />
                    <span className={element('my-name')}>
                        {getUserFullName(person)}
                    </span>
                </div>
                <div className={element('info')}>
                    <span className={element('badge')}>
                        <Badge color={badgeColor.primary500}>
                            {badgeTitle}
                        </Badge>
                    </span>
                    <Rating
                        starColor={ratingStarColor.primary500}
                        size={ratingSize.medium}
                        scoreColor={ratingScoreColor.black}
                        rating={rating}
                    />
                </div>
            </div>
        </div>
    );
};