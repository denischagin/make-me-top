import { useState } from 'react';

import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Rating } from '@shared/Rating';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';
import { sortByRating } from '@shared/utils/sortByRating';

import { avatarSize } from '@shared/Avatar/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';

export const SelectUsersList = (props: UserListInterface) => {
    const {
        keepersList,
        explorersList,
    } = props;

    const keepersOrExplorers = keepersList || explorersList || [];

    const [block, element] = bem('select-list');
    const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);

    function getSelectedUser(userId: number) {
        setSelectedUserIds([...selectedUserIds, userId]);
    }

    function removeSelectedUser(userId: number) {
        setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    }

    return (
        <div className={block()}>
            {sortByRating(keepersOrExplorers)?.map((user, index) => (
                <div
                    key={user.personId}
                    className={element('item', {
                        selected: selectedUserIds.includes(user.personId),
                    })}
                >
                    <div className={element('user')}>
                        <Avatar size={avatarSize.small} />
                        <span className={element('name')}>
                            {getUserFullName(keepersOrExplorers[index])}
                        </span>
                    </div>
                    <div className={element('info')}>
                        <div
                            className={element('button', {
                                visible: selectedUserIds.includes(user.personId),
                            })}
                        >
                            {
                                !selectedUserIds.includes(user.personId) ?
                                    <Button
                                        size={buttonSize.small}
                                        color={buttonColor.filled}
                                        onClick={() => getSelectedUser(user.personId)}
                                        title="Выбрать хранителя"
                                    /> :
                                    <Button
                                        size={buttonSize.small}
                                        color={buttonColor.primary500}
                                        onClick={() => removeSelectedUser(user.personId)}
                                        title="Отменить выбор"
                                    />
                            }
                        </div>
                        <div
                            className={element('rating', {
                                hide: selectedUserIds.includes(user.personId),
                            })}
                        >
                            <Rating
                                starColor={ratingStarColor.primary500}
                                size={ratingSize.medium}
                                scoreColor={ratingScoreColor.black}
                                rating={user.rating}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
