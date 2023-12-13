import { EditHomeworkModal } from '@features/edit-homework';
import { GroupDetailsKeeperHomework } from '@entities/homework';
import React, { useState } from 'react';
import { ActiveHomeworkItemProps } from '@entities/homework/ui/KeeperHomeworkItem/interface';
import { CircleBadge } from '@shared/ui/CircleBadge';

export const KeeperHomeworkItem = ({ homework, isClosed = false }: ActiveHomeworkItemProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModal = () => setIsOpenModal(true);

    const handleShowMoreClick = (homework: number) => {
        handleOpenModal();
    };

    return (
        <>
            <EditHomeworkModal
                currentHomework={homework}
                isOpen={isOpenModal}
                onClose={handleCloseModal}
            />
            <CircleBadge badgeContent={homework.waitingRequestsCount}>
                <GroupDetailsKeeperHomework
                    key={homework.homeworkId}
                    onShowMoreClick={handleShowMoreClick}
                    isClosed={isClosed}
                    {...homework}
                />
            </CircleBadge>
        </>
    );
};