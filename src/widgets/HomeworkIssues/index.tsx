import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { transformHomeworkResponse } from '@entities/homework';
import { useNavigate, useParams } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import './styles.scss';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { getUrlHomework } from '@shared/constants/links';
import { useGetExplorerThemesMarksQuery } from '@entities/theme';
import { useAuth } from '@entities/viewer';
import { ExplorerBadgeByRequestStatus } from '@entities/homework/ui/ExplorerBadgeByRequestStatus';

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
                    homeworks.map(({
                                       homeworkId,
                                       content,
                                       status,
                                       mark,
                                       title,
                                   }, index) => (
                        <div className={element('item')} key={homeworkId}>
                            <Typography className={element('content')} variant={typographyVariant.h3}>
                                {index + 1}. {title.length > 100 ? title.slice(0, 100) + '...' : title}
                            </Typography>


                            <Typography className={element('content')} variant={typographyVariant.regular16} parseLink>
                                {content.length > 300 ? content.slice(0, 300) + '...' : content}
                            </Typography>

                            <div className={element('bottom-panel')}>
                                {!(themesMarks?.[themeId] && status?.status !== 'CLOSED') && (
                                    <Button
                                        className={element('button-homework')}
                                        title={'Перейти'}
                                        size={buttonSize.small}
                                        color={buttonColor.filled}
                                        onClick={handleNavigateToHomeworkClick(homeworkId)}
                                    />
                                )}


                                <div className={element('badge')}>
                                    <ExplorerBadgeByRequestStatus
                                        mark={mark?.mark}
                                        requestStatus={status?.status}
                                        alreadyHaveMarkOnTheme={!!themesMarks?.[themeId]}
                                    />
                                </div>
                            </div>


                        </div>
                    )) : (
                        <Typography variant={typographyVariant.regular16}>
                            Домашних заданий пока нет
                        </Typography>
                    )}
            </div>
        </>
    );
};