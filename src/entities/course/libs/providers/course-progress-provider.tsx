import { useNavigate, useParams } from 'react-router-dom';
import { CourseProgressContext, CourseProgressData, useGetExplorerCourseProgressQuery } from '@entities/course';
import { ReactNode, useEffect, useMemo } from 'react';
import { getUrlThemeByCourseId } from '@shared/constants/links';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAuth } from '@entities/viewer';

type CourseProgressProviderProps = {
    children: ReactNode;
};

export const CourseProgressProvider = ({ children }: CourseProgressProviderProps) => {
    const { courseId, themeId } = useParams();
    const navigate = useNavigate();
    const { role } = useAuth();

    const explorerCourseProgressResponse = useGetExplorerCourseProgressQuery(courseId ?? skipToken, {
        skip: role !== 'EXPLORER',
    });
    const {
        data: explorerCourseProgress,
        isSuccess,
        isError,
    } = explorerCourseProgressResponse;

    const planets = explorerCourseProgress?.progress.planets;

    const currentTheme = useMemo(
        () => planets?.find(
            (planet) => planet.courseThemeId.toString() === themeId,
        ),
        [themeId, explorerCourseProgress]);

    const educationTheme = useMemo(
        () =>
            planets?.find(
                (theme) => theme.courseThemeId === explorerCourseProgress?.currentThemeId,
            ),
        [planets, explorerCourseProgress?.currentThemeId],
    );

    const isCurrentThemeInPlanets = !!currentTheme;

    const isCompletedCurrentSystem = planets?.[planets.length - 1].completed!;

    const isCompletedCurrentPlanet = currentTheme?.completed!;

    const isNoValidThemeId = !!planets && !!themeId && !isCurrentThemeInPlanets
        || (currentTheme?.courseThemeNumber! > educationTheme?.courseThemeNumber!);

    const isSkipThemeQuery = (role !== 'KEEPER' || !themeId) && (!themeId || !isCurrentThemeInPlanets || isNoValidThemeId);

    const isSkipHomeworkQuery = !explorerCourseProgress?.groupId || !themeId || isNoValidThemeId;

    useEffect(() => {
        if (!isNoValidThemeId) return;

        navigate(getUrlThemeByCourseId({ courseId: courseId! }));
    }, [isNoValidThemeId]);

    const courseProgressData: CourseProgressData = {
        explorerCourseProgress,
        isSuccess,
        isError,
        isCurrentThemeInPlanets,
        isSkipThemeQuery,
        isSkipHomeworkQuery,
        isNoValidThemeId,
        isCompletedCurrentSystem,
        isCompletedCurrentPlanet,
    };

    return (
        <CourseProgressContext.Provider value={courseProgressData}>
            {children}
        </CourseProgressContext.Provider>
    );
};