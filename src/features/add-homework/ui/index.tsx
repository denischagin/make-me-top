import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { ModalSendHomework } from '@entities/homework';
import { useCreateHomeworkMutation } from '@entities/homework/api/api';
import { useAuth } from '@entities/viewer';
import { useGetKeeperCurrentGroupQuery } from '@entities/course';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './styles.scss';

export const AddHomeworkButton = () => {
	const { themeId, courseId } = useParams();
	const [block,] = bem('add-button-homework');
	
	const { role } = useAuth();
	
	const {
		data: keeperCurrentGroup,
	} = useGetKeeperCurrentGroupQuery(undefined, {
		skip: role !== 'KEEPER'
	});
	
	const [createHomework,] = useCreateHomeworkMutation();
	
	const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);
	
	const handleOnSubmitHomework = (homework: string) => {
		if (!homework) return toast.error('Введите домашнее задание!');
		
		createHomework({
			themeId: Number(themeId),
			groupId: keeperCurrentGroup?.groupId!,
			content: homework
		});
		setIsOpenModalHomework(false);
	};
	
	return (
		<>
			<Button
				className={block()}
				title={'Дать еще домашнее задание'}
				size={buttonSize.small}
				color={buttonColor.filled}
				onClick={() => setIsOpenModalHomework(true)}
			/>
			
			<ModalSendHomework
				isOpen={isOpenModalHomework}
				onClose={() => setIsOpenModalHomework(false)}
				onSubmit={handleOnSubmitHomework}
				title="Добавить домашнее задание"
			/>
		</>
	);
};