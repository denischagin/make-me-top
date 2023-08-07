import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { CourseKeeper } from '@entities/user/model/types';
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
import {
    TOAST_ERROR_CHOOSE_KEEPER,
    TOAST_REQUEST_SENT,
} from '@shared/SelectUsersList/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';

export const SelectUsersList = (props: UserListInterface) => {
    const {
        keepersList,
        courseId,
    } = props;

    const dispatch = useAppDispatch();
    const isExplorer = useAppSelector(explorerIsExplorerSelector);

    const pathByUserRole = isExplorer ? URL_EXPLORER : URL_KEEPER;

    const [block, element] = bem('select-list');
    const [selectedUser, setSelectedUser] = useState<CourseKeeper>({
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        keeperId: 0,
        rating: 0,
    });

    function removeUser() {
        setSelectedUser({
            personId: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            keeperId: 0,
            rating: 0,
        });
    }

    const navigate = useNavigate();

    return (
        <div className={block()}>
            {sortByRating(keepersList)?.map((user) => (
                <div
                    key={user.personId}
                    className={element('item', {
                        selected: selectedUser.keeperId,
                    })}
                >
                    <div className={element('user')}>
                        <Avatar size={avatarSize.small} />
                        <span className={element('name')}>
                            {getUserFullName(user)}
                        </span>
                    </div>
                    <div className={element('info')}>
                        <div
                            className={element('button', {
                                visible: selectedUser.keeperId,
                            })}
                        >
                            {
                                !selectedUser.personId ?
                                    <Button
                                        size={buttonSize.small}
                                        color={buttonColor.filled}
                                        onClick={() => setSelectedUser(user)}
                                        title="Выбрать хранителя"
                                    /> :
                                    <Button
                                        size={buttonSize.small}
                                        color={buttonColor.primary500}
                                        onClick={() => removeUser()}
                                        title="Отменить выбор"
                                    />
                            }
                        </div>
                        <div
                            className={element('rating', {
                                hide: selectedUser.keeperId,
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
                !!keepersList?.length &&
                <div className={element('submit-selected')}>
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.primary500}
                        onClick={() => {
                            if (selectedUser.keeperId) {
                                dispatch(postCourseRequest({
                                    payload: {
                                        courseId: courseId!,
                                        keeperId: selectedUser.keeperId,
                                    },
                                }));
                                toast.success(TOAST_REQUEST_SENT);

                                return navigate(pathByUserRole);
                            }

                            return toast.error(TOAST_ERROR_CHOOSE_KEEPER);
                        }}
                        title='Отправить заявку'
                    />
                </div>
            }
        </div>
    );
};
