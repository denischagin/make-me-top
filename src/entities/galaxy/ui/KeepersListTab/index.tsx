import { CurrentUserItem } from '@entities/user';
import { KeepersListTabProps } from './interface';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { Typography } from '@shared/ui/Typography';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';
import { SelectUsersList } from '@shared/ui/SelectUsersList';
import { UsersList } from '@shared/ui/UsersList';
import { bem } from '@shared/utils/helpers/bem';

export const KeepersListTab = ({
    courseInfo,
    canYouSendCourseRequest,
    selectedKeepers,
    setSelectedKeepers,
}: KeepersListTabProps) => {
    const [, element] = bem('circle-modal-galaxy');

    return (
        <>
            {!!courseInfo?.yourKeeper && (
                <>
                    <CurrentUserItem
                        {...courseInfo.yourKeeper}
                        role='KEEPER'
                        badgeTitle='Мой хранитель'
                    />
                    <DividingLine color={DividingLineColor.gray500} />
                </>
            )}
            {courseInfo?.keepers?.length === 0 ? (
                <Typography
                    variant={typographyVariant.medium16}
                    color={typographyColor.black}
                    className={element('empty-text')}
                >
                    У данного курса нет хранителей
                </Typography>
            ) : canYouSendCourseRequest ? (
                <SelectUsersList
                    keepersList={courseInfo?.keepers}
                    onSelect={setSelectedKeepers}
                    selectedUsers={selectedKeepers}
                />
            ) : (
                <UsersList keepersList={courseInfo?.keepers} />
            )}
        </>
    );
};
