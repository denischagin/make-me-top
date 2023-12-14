import { bem } from '@shared/utils/helpers/bem';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import NotFound from '@pages/NotFound';
import { CourseProgressProvider, useExplorerCourseProgress, useGetCourseInfoByCourseIdQuery } from '@entities/course';
import { ThemeTabs } from '@widgets/ThemeTabs';
import { ThemeContent } from '@widgets/ThemeContent';
import { useAuth } from '@entities/viewer';
import { HomeworkIssues } from '@widgets/HomeworkIssues';
import { CurrentHomeworkRequests } from '@widgets/CurrentHomeworkRequests/ui/CurrentHomeworkRequests';
import { OldHomeworksRequest } from '@widgets/OldHomeworksRequest/ui/OldHomeworksRequests';
import { roles } from '@shared/constants/storageKeys';
import React, { ReactElement } from 'react';
import { ThemeGrade } from '@widgets/ThemeGrade';
import { AddHomeworkButton } from '@features/add-homework';
import { useParams } from 'react-router-dom';
import { Badge } from '@shared/ui/Badge';
import { badgeColor } from '@shared/ui/Badge/interfaces';


const homeworkSectionForRole: Record<roles, ReactElement> = {
    EXPLORER: (
        <HomeworkIssues />
    ),
    KEEPER: (
        <>
            <AddHomeworkButton />
            <ThemeGrade />
            <CurrentHomeworkRequests />
            <OldHomeworksRequest />
        </>
    ),
};

const ThemeCardPage = () => {
    const [block, element] = bem('theme-card-page');
    const { role } = useAuth();
    const { courseId } = useParams();

    const {
        explorerCourseProgress,
        isError,
    } = useExplorerCourseProgress();

    const { data: courseInfo } = useGetCourseInfoByCourseIdQuery(Number(courseId));

    const courseTitle = explorerCourseProgress?.progress.title || courseInfo?.title;

    if (isError) return <NotFound />;

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <Container>
                    <div>
                        <Typography
                            className={element('course-title')}
                            variant={typographyVariant.h1}
                        >
                            {courseTitle}
                        </Typography>

                        <div className={element('content')}>
                            <div>
                                <ThemeTabs />

                                {explorerCourseProgress?.mark && (
                                    <Typography className={element('mark')} variant={typographyVariant.medium16}>
                                        Оценка за курс: <Badge
                                        color={badgeColor.primary500}>{explorerCourseProgress?.mark}</Badge>
                                    </Typography>
                                )}
                            </div>

                            <div>
                                <ThemeContent />

                                <div className={element('homework-wrapper')}>
                                    {role && homeworkSectionForRole[role]}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default () => (
    <CourseProgressProvider>
        <ThemeCardPage />
    </CourseProgressProvider>
);