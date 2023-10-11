import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Button } from '@shared/ui/Button';
import { SelectUsersKeepersItem } from '@shared/ui/SelectUsersKeepersItem';

import { useAppDispatch } from '@app/providers/store/hooks';

import { toggleModal } from '@entities/user/model/slice';
import { CourseKeeper } from '@entities/user/model/types';

import { bem } from '@shared/utils/helpers/bem';
import { sortByRating } from '@shared/utils/helpers/sortByRating';

import { URL_PROFILE } from '@shared/constants/links';
import { TOAST_ERROR_CHOOSE_KEEPER } from '@shared/constants/toastTitles';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import { UserListInterface } from '@shared/types/common';

import './styles.scss';
import { usePostCourseRequestMutation } from '@entities/explorer/api/api';
import { useStatus } from '@shared/utils/hooks/use-status';

export const SelectUsersList = (props: UserListInterface) => {
    const { keepersList, courseId } = props;

    const dispatch = useAppDispatch();

    const [block, element] = bem('select-list');
    const [selectedUsers, setSelectedUsers] = useState<CourseKeeper[]>([]);
    const [postCourseRequest, { isSuccess }] = usePostCourseRequestMutation();

    const navigate = useNavigate();

    useStatus(() => {
        dispatch(toggleModal());
        navigate(URL_PROFILE);
    }, isSuccess);

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

        const keeperIds = selectedUsers.map((user) => user.keeperId);

        console.log(courseId!, keeperIds);

        postCourseRequest({
            courseId: courseId as number,
            keeperIds: keeperIds,
        });
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
