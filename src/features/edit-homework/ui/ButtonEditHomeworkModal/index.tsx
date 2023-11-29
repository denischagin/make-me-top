import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { MouseEventHandler, useState } from 'react';
import { EditHomeworkModal } from '@features/edit-homework';
import { ButtonEditHomeworkModalProps } from '@features/edit-homework/ui/ButtonEditHomeworkModal/interface';

export const ButtonEditHomeworkModal = ({ currentHomework }: ButtonEditHomeworkModalProps) => {
	const [isOpenHomeworkModal, setIsOpenHomeworkModal] = useState(false);
	
	const handleOpenModal = () => setIsOpenHomeworkModal(true);
	const handleCloseModal = () => setIsOpenHomeworkModal(false);
	
	
	return (
		<>
			<EditHomeworkModal
				isOpen={isOpenHomeworkModal}
				onClose={handleCloseModal}
				currentHomework={currentHomework}
			/>
			
			<Button
				title={'Просмотреть'}
				size={buttonSize.small}
				onClick={handleOpenModal}
			/>
		</>
	);
};