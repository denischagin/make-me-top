import { Avatar } from '@shared/ui/Avatar';
import { Rating } from '@shared/ui/Rating';

import {
    CourseExplorer,
    CourseKeeper,
} from '@entities/user/model/types';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { sortByRating } from '@shared/utils/helpers/sortByRating';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';

export const UsersList = (props: UserListInterface) => {
    const {
        keepersList,
        explorersList,
    } = props;

    const [block, element] = bem('users-list');

    const keepersOrExplorers = keepersList || explorersList || [];

    return (
        <div className={block()}>
            {sortByRating(keepersOrExplorers).map((user, index) => (
                <div
                    key={user.personId}
                    className={element('item')}
                >
                    <div className={element('user')}>
                        <Avatar size={avatarSize.small} />
                        <span className={element('name')}>
                            {getUserFullName(keepersOrExplorers[index])}
                        </span>
                    </div>
                    <div className={element('info')}>
                        <Rating
                            systemColor={ratingSystemColor.primary500}
                            size={ratingSize.medium}
                            scoreColor={ratingScoreColor.black}
                            rating={user.rating}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
