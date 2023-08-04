import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useAppSelector } from '@app/providers/store/hooks';

import { userCourseInfoSelector } from '@entities/user/model/selectors';
import { postCourseRequest } from '@entities/user/thunks/postCourseRequest';

import { explorerIsExplorerSelector } from '@entities/explorer/model/selectors';

import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Rating } from '@shared/Rating';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';
import { sortByRating } from '@shared/utils/sortByRating';

import {
    URL_EXPLORER,
    URL_KEEPER,
} from '@shared/constants/links';

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
        courseId,
    } = props;

    const navigate = useNavigate();

    const isExplorer = useAppSelector(explorerIsExplorerSelector);
    const courseInfo = useAppSelector(userCourseInfoSelector);

    const keepersOrExplorers = keepersList || explorersList || [];
    const pathByUserRole = isExplorer ? URL_EXPLORER : URL_KEEPER;

    const [block, element] = bem('select-list');
    const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);

    const {
        yourKeeper,
    } = courseInfo;

    function onSubmitClick() {
        if (!courseId) {
            toast.error('Course nor found');
        } else if (!selectedUserIds.length) {
            toast.error('Необходимо выбрать хранителя');
        } else if (selectedUserIds.length !== 1) {
            toast.error('Выбирите только одного хранителя');
        } else if (selectedUserIds.includes(yourKeeper.personId)) {
            toast.error('Вас уже обучает этот хранитель');
        } else {
            selectedUserIds.forEach((userId) => {
                postCourseRequest({
                    payload: {
                        courseId,
                        keeperId: userId,
                    },
                });
            });
            toast('Заявка отправлена');
            navigate(pathByUserRole);
        }
    }

    function getSelectedUser(userId: number) {
        if (!selectedUserIds.length) {
            setSelectedUserIds([...selectedUserIds, userId]);
        } else {
            toast.error('Можно выбрать только одного хранителя');
        }
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
                                (
                                    !selectedUserIds.includes(user.personId)
                                    && (selectedUserIds.length < 2)
                                ) ?
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
            {
                !!keepersOrExplorers.length &&
                <div className={element('submit-selected')}>
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.primary500}
                        onClick={() => onSubmitClick()}
                        title='Отправить заявку'
                    />
                </div>
            }
        </div>
    );
};
