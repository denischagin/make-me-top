import { EditHomeworkModal } from '@features/edit-homework';
import { GroupDetailsCurrentHomework } from '@widgets/CurrentHomeworkRequests/ui/GroupDetailsCurrentHomework';
import React, { useState } from 'react';
import { ActiveHomeworkItemProps } from '@widgets/CurrentHomeworkRequests/ui/ActiveHomeworkItem/interface';

export const ActiveHomeworkItem = ({ homework, }: ActiveHomeworkItemProps) => {
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
			<GroupDetailsCurrentHomework
				key={homework.homeworkId}
				onShowMoreClick={handleShowMoreClick}
				{...homework}
			/>
		</>
	);
};