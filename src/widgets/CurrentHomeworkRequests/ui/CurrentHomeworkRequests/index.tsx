import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import React, { useState } from 'react';
import { transformHomeworkResponse } from '@entities/homework';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { GroupDetailsCurrentHomework } from '@widgets/CurrentHomeworkRequests/ui/GroupDetailsCurrentHomework';
import { useAuth } from '@entities/viewer';
import { AddHomeworkButton } from '@features/add-homework';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { EditHomeworkModal } from '@features/edit-homework';
import { ActiveHomeworkItem } from '@widgets/CurrentHomeworkRequests/ui/ActiveHomeworkItem';

export const CurrentHomeworkRequests = () => {
	const [block, element] = bem('current-homework-requests');
	const { themeId, courseId } = useParams();
	const { role } = useAuth();
	const { data: homeworkResponse } = useGetHomeworksQuery({ themeId: themeId! }, {
		skip: !themeId || role !== 'KEEPER'
	});
	const [activeHomework, setActiveHomework] = useState(false);
	
	const activeHomeworks = transformHomeworkResponse(homeworkResponse, 'KEEPER')?.activeHomeworks;
	
	if (!themeId)
		return null;
	
	return (
		<>
			<AddHomeworkButton />
			
			<div className={block()}>
				<Typography variant={typographyVariant.h2}>
					Текущие домашние задания
				</Typography>
				
				{activeHomeworks && activeHomeworks.length !== 0 ? (
					activeHomeworks?.map((homework) => (
						<ActiveHomeworkItem key={homework.homeworkId} homework={homework} />
					))
				) : (
					<Typography variant={typographyVariant.regular16}>
						Нет активных домашних заданий
					</Typography>
				)}
			</div>
		
		</>
	
	);
};