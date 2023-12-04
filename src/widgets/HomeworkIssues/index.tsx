import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { transformHomeworkResponse } from '@entities/homework';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, MouseEventHandler } from 'react';
import './styles.scss';
import { useCourseProgress } from '@entities/course';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { getUrlHomework } from '@shared/constants/links';

export const HomeworkIssues = () => {
	const [block, element] = bem('homework-issues');
	
	const { themeId, courseId } = useParams();
	const navigate = useNavigate();
	
	const { isCompletedCurrentPlanet, explorerCourseProgress } = useCourseProgress();
	const { data: homeworkResponse } = useGetHomeworksQuery(themeId ? { themeId } : skipToken);
	const homeworks = transformHomeworkResponse(homeworkResponse, 'EXPLORER');
	
	const handleNavigateToHomeworkClick =
		(homeworkId: number): MouseEventHandler<HTMLButtonElement> =>
			(e) => {
				navigate(getUrlHomework({ homeworkId }));
			}
	;
	
	if (!themeId || !homeworks) return null;
	
	return (
		<>
			<div className={block()}>
				
				{homeworks.map(({
					homeworkId,
					content
				}, index) => (
					// TODO сделать отображение оценки по homework
					<div className={element('item')} key={homeworkId}>
						<Typography className={element('title')} variant={typographyVariant.h2}>
							Домашнее задание {homeworks.length !== 1 && index + 1}
						</Typography>
						
						<Typography className={element('content')} variant={typographyVariant.regular16}>
							{content.length > 300 ? content.slice(0, 300) + '...' : content}
						</Typography>
						
						{!isCompletedCurrentPlanet &&
						  <Button
							className={element('button-homework')}
							title={'Перейти'}
							size={buttonSize.small}
							color={buttonColor.filled}
							onClick={handleNavigateToHomeworkClick(homeworkId)}
						  />
						}
					</div>
				))}
			</div>
		</>
	);
};