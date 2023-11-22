import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { ModalSendHomework } from '@entities/homework';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './styles.scss';
import { useCourseProgress } from '@entities/course';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';

export const HomeworkIssues = () => {
	const [block, element] = bem('homework-issues');
	
	const { themeId, courseId } = useParams();
	
	const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);
	
	const { isCompletedCurrentPlanet, explorerCourseProgress } = useCourseProgress();
	const groupId = explorerCourseProgress?.groupId.toString();
	const { data: homeworks } = useGetHomeworksQuery(themeId && groupId ? { themeId, groupId } : skipToken);
	
	const handleOnSubmitHomework = (homework: string) => {
		console.log(homework);
		setIsOpenModalHomework(false);
	};
	
	if (!themeId) return null;
	
	return (
		<>
			<div className={block()}>
				<Typography className={element('title')} variant={typographyVariant.h2}>
					Домашнее задание
				</Typography>
				
				{/*{ homeworks?.map(() => (*/}
				{/*	<>*/}
				{/*	</>*/}
				{/*))}*/}
				
				<Typography className={element('content')} variant={typographyVariant.regular16}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate eaque,
					error ex magnam magni nostrum placeat porro possimus ratione soluta suscipit vitae
					voluptatem! Deleniti dolorem nisi optio perferendis tempora.
				</Typography>
				
				
				{!isCompletedCurrentPlanet &&
				  <Button
					className={element('button-homework')}
					title={'Ответить'}
					size={buttonSize.small}
					color={buttonColor.filled}
					onClick={() => setIsOpenModalHomework(true)}
				  />
				}
			</div>
			
			<ModalSendHomework
				isOpen={isOpenModalHomework}
				onClose={() => setIsOpenModalHomework(false)}
				onSubmit={handleOnSubmitHomework}
				title="Введите домашнее задание"
			/>
		</>
	);
};