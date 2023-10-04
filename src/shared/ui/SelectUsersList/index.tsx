import {
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { DividingLine } from '@shared/ui/DividingLine';
import { Rating } from '@shared/ui/Rating';
import { SelectUsersKeepersItem } from '@shared/ui/SelectUsersKeepersItem';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import {
    userIsErrorSelector,
    userIsSuccessSelector,
} from '@entities/user/model/selectors';
import { toggleModal } from '@entities/user/model/slice';
import { CourseKeeper } from '@entities/user/model/types';
import { postCourseRequest } from '@entities/user/thunks/postCourseRequest';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { sortByRating } from '@shared/utils/helpers/sortByRating';

import {
    URL_EXPLORER,
    URL_PROFILE,
} from '@shared/constants/links';
import { TOAST_ERROR_CHOOSE_KEEPER } from '@shared/constants/toastTitles';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';

export const SelectUsersList = (props: UserListInterface) => {
    const {
        keepersList,
        courseId,
    } = props;

    const dispatch = useAppDispatch();

    const [block, element] = bem('select-list');
    const [selectedUsers, setSelectedUsers] = useState<CourseKeeper[]>([]);
    const isError = useAppSelector(userIsErrorSelector);
    const isSuccess = useAppSelector(userIsSuccessSelector);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isSuccess) return;

        dispatch(toggleModal());
        navigate(URL_PROFILE);
    }, [isSuccess]);

    const handleUnSelectAll = () => {
        if (keepersList) setSelectedUsers([]);
    };

    const handleSelectAll = () => {
        if (keepersList) setSelectedUsers(keepersList);
    };

    function handleRemoveUser(userId: number) {
        setSelectedUsers(
            selectedUsers.filter((user) => user.personId !== userId),
        );
    }

    const handleSendApplication = () => {
        if (selectedUsers.length === 0)
            return toast.error(TOAST_ERROR_CHOOSE_KEEPER);

        const keepers = selectedUsers.map((user) => user.keeperId);

        dispatch(
            postCourseRequest({
                payload: {
                    courseId: courseId!,
                    keepers,
                },
            }),
        );
    };

    const isSelectedAll = selectedUsers.length === keepersList?.length;

    return (
        <div className={block()}>
            <div className={element('button-select')}>
                {keepersList?.length !== 0 && (
                    <Button
                        size={buttonSize.small}
                        color={
                            isSelectedAll
                                ? buttonColor.primary500
                                : buttonColor.filled
                        }
                        onClick={
                            isSelectedAll ? handleUnSelectAll : handleSelectAll
                        }
                        title={
                            isSelectedAll ? 'Сбросить выбор' : 'Выбрать всех'
                        }
                    />
                )}
            </div>

            {sortByRating(keepersList)?.map((user) => (
                <SelectUsersKeepersItem
                    key={user.personId}
                    user={user}
                    selected={selectedUsers.some(
                        (selectedUser) =>
                            selectedUser.personId === user.personId,
                    )}
                    onRemoveUser={handleRemoveUser}
                    onSelectUser={(user) =>
                        setSelectedUsers([...selectedUsers, user])
                    }
                />
            ))}

            {!!keepersList?.length && (
                <div className={element('submit-selected')}>
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.primary500}
                        onClick={handleSendApplication}
                        title='Отправить заявку'
                    />
                </div>
            )}
        </div>
    );
};
