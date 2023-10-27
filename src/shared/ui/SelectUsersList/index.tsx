import { Button } from '@shared/ui/Button';
import { SelectUsersKeepersItem } from '@shared/ui/SelectUsersKeepersItem';

import { bem } from '@shared/utils/helpers/bem';
import { sortByRating } from '@shared/utils/helpers/sortByRating';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';
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
