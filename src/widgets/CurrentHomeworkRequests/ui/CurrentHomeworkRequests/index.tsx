import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import React, { useState } from 'react';
import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Card } from '@shared/ui/Card';
import { ModalSendHomework } from '@entities/homework';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { GroupDetailsCurrentHomework } from '@widgets/CurrentHomeworkRequests/ui/GroupDetailsCurrentHomework';

export const CurrentHomeworkRequests = () => {
	const [block, element] = bem('current-homework-requests');
	const { themeId, courseId } = useParams();
	
	const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);
	const handleOnSubmitHomework = (homework: string) => {
		console.log(homework);
		setIsOpenModalHomework(false);
	};
	
	if (!themeId) return null;
	
	const [activeHomework, setActiveHomework] = useState(false);
	
	return (
		<>
			<Button
				className={element('button-homework')}
				title={'Дать еще домашнее задание'}
				size={buttonSize.small}
				color={buttonColor.filled}
				onClick={() => setIsOpenModalHomework(true)}
			/>
			
			<div className={block()}>
				<Typography variant={typographyVariant.h2}>
					Текущие домашние задания и запросы на проверку
				</Typography>
				
				<GroupDetailsCurrentHomework />
			</div>
			
			<ModalSendHomework
				isOpen={isOpenModalHomework}
				onClose={() => setIsOpenModalHomework(false)}
				onSubmit={handleOnSubmitHomework}
				title="Добавить домашнее задание"
			/>
		</>
	);
};