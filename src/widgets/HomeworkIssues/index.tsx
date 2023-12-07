import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { transformHomeworkResponse } from '@entities/homework';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, MouseEventHandler } from 'react';
import './styles.scss';
import { useExplorerCourseProgress } from '@entities/course';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { getUrlHomework } from '@shared/constants/links';
import { Badge } from '@shared/ui/Badge';
import { badgeColor } from '@shared/ui/Badge/interfaces';

export const HomeworkIssues = () => {
    const [block, element] = bem('homework-issues');

    const { themeId, courseId } = useParams();
    const navigate = useNavigate();

    const { isCompletedCurrentPlanet, explorerCourseProgress } = useExplorerCourseProgress();
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
                                    content,
                                    status,
                                    mark,
                                }, index) => (
                    // TODO сделать отображение оценки по homework
                    <div className={element('item')} key={homeworkId}>
                        <Typography className={element('title')} variant={typographyVariant.h2}>
                            Домашнее задание {homeworks.length !== 1 && index + 1}
                        </Typography>


                        <Typography className={element('content')} variant={typographyVariant.regular16}>
                            {content.length > 300 ? content.slice(0, 300) + '...' : content}
                        </Typography>

                        <div className={element('bottom-panel')}>
                            {!isCompletedCurrentPlanet &&
                                <Button
                                    className={element('button-homework')}
                                    title={'Перейти'}
                                    size={buttonSize.small}
                                    color={buttonColor.filled}
                                    onClick={handleNavigateToHomeworkClick(homeworkId)}
                                />
                            }


                            {status?.status === 'EDITING' && (
                                <div className={element('badge')}>
                                    <Badge color={badgeColor.black}>
                                        Хранитель проверил задание
                                    </Badge>
                                </div>
                            )}
                            {status?.status === 'CLOSED' && (
                                <div className={element('badge')}>
                                    <Typography variant={typographyVariant.medium14} color={typographyColor.white}>
                                        Оценка:
                                    </Typography>
                                    <Badge color={badgeColor.primary500}>
                                        {mark?.mark}
                                    </Badge>

                                </div>
                            )}

                        </div>


                    </div>
                ))}
            </div>
        </>
    );
};