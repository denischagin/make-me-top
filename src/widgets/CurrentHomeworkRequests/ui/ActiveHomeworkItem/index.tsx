import { EditHomeworkModal } from '@features/edit-homework';
import { GroupDetailsCurrentHomework } from '@widgets/CurrentHomeworkRequests/ui/GroupDetailsCurrentHomework';
import React, { useState } from 'react';
import { ActiveHomeworkItemProps } from '@widgets/CurrentHomeworkRequests/ui/ActiveHomeworkItem/interface';
import { CircleBadge } from '@shared/ui/CircleBadge';

export const ActiveHomeworkItem = ({ homework }: ActiveHomeworkItemProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModal = () => setIsOpenModal(true);

    const handleShowMoreClick = (homework: number) => {
        handleOpenModal();
    };
    console.log(homework.waitingRequestsCount);

    return (
        <>
            <EditHomeworkModal
                currentHomework={homework}
                isOpen={isOpenModal}
                onClose={handleCloseModal}
            />
            <CircleBadge badgeContent={homework.waitingRequestsCount}>
                <GroupDetailsCurrentHomework
                    key={homework.homeworkId}
                    onShowMoreClick={handleShowMoreClick}
                    {...homework}
                />
            </CircleBadge>
        </>
    );
};