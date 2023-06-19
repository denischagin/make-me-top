import { Avatar } from '@shared/Avatar';
import { Rating } from '@shared/Rating';

import { bem } from '@shared/utils/bem';

import { avatarSize } from '@shared/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';

import {
    UserInterface,
    UserListInterface,
} from '@shared/types/common';

import './styles.scss';

export const UsersList = (props: UserListInterface) => {
    const {
        list,
    } = props;

    const [block, element] = bem('users-list');

    return (
        <div className={block()}>
            {list.map((user: UserInterface) => (
                <div
                    key={user.id}
                    className={element('item')}
                >
                    <div className={element('user')}>
                        <Avatar
                            size={avatarSize.small}
                            image={user.avatar}
                        />
                        <span className={element('name')}>{user.name}</span>
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
