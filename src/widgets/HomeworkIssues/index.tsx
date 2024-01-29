import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { transformHomeworkResponse } from '@entities/homework';
import { useNavigate, useParams } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import './styles.scss';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { getUrlHomework } from '@shared/constants/links';
import { useGetExplorerThemesMarksQuery } from '@entities/theme';
import { useAuth } from '@entities/viewer';
import { HomeworkIssue } from '@entities/homework/ui/HomeworkIssue';

export const HomeworkIssues = () => {
    const [block, element] = bem('homework-issues');

    const { role } = useAuth();
    const { themeId, courseId } = useParams();
    const navigate = useNavigate();

    const { data: homeworkResponse } = useGetHomeworksQuery(themeId ? { themeId } : skipToken);
    const homeworks = transformHomeworkResponse(homeworkResponse, 'EXPLORER');
    const {
        data: themesMarks,
    } = useGetExplorerThemesMarksQuery(courseId!, {
        skip: role !== 'EXPLORER' || !courseId,
    });

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

                <Typography className={element('title')} variant={typographyVariant.h2}>
                    Домашние задания
                </Typography>

                {homeworks.length !== 0 ?
                    homeworks.map((homework, index) => (
                        <HomeworkIssue
                            key={homework.homeworkId}
                            {...homework}
                            homeworkIndex={index}
                            alreadyHaveMarkOnTheme={!!themesMarks?.[themeId] && homework.status?.status !== 'CLOSED'}
                            onHomeworkClick={handleNavigateToHomeworkClick(homework.homeworkId)}
                        />
                    )) : (
                        <Typography variant={typographyVariant.regular16}>
                            Домашних заданий пока нет
                        </Typography>
                    )}
            </div>
        </>
    );
};