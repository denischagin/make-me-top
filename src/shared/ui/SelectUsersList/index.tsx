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
import { SelectUsersListProps } from './interface';

export const SelectUsersList = (props: SelectUsersListProps) => {
    const { keepersList, courseId, onSelect, selectedUsers } = props;

    const [block, element] = bem('select-list');

    const handleUnSelectAll = () => {
        if (keepersList) onSelect([]);
    };

    const handleSelectAll = () => {
        if (keepersList) onSelect(keepersList);
    };

    function handleRemoveUser(userId: number) {
        onSelect(selectedUsers.filter((user) => user.personId !== userId));
    }

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
                    onSelectUser={(user) => onSelect([...selectedUsers, user])}
                />
            ))}
        </div>
    );
};
