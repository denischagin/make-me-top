import {
    CourseExplorer,
    CourseKeeper,
} from '@entities/user/model/types';

import { Avatar } from '@shared/Avatar';
import { Rating } from '@shared/Rating';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { avatarSize } from '@shared/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';

export const UsersList = (props: UserListInterface) => {
    const {
        keeperslist,
        explorersList,
    } = props;

    const [block, element] = bem('users-list');

    const keepersOrExplorers = explorersList || keeperslist;

    return (
        <div className={block()}>
            {keepersOrExplorers?.map((user, index) => (
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
                            starColor={ratingStarColor.primary500}
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
