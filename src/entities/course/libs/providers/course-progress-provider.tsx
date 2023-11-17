import { useNavigate, useParams } from 'react-router-dom';
import { CourseProgressData, useGetExplorerCourseProgressQuery, CourseProgressContext } from '@entities/course';
import { useEffect, useMemo } from 'react';
import { getUrlThemeByCourseId } from '@shared/constants/links';

type CourseProgressProviderProps = {
	children: React.ReactNode;
};

export const CourseProgressProvider = ({ children }: CourseProgressProviderProps) => {
	const { courseId, themeId } = useParams();
	const navigate = useNavigate();
	
	const {
		data: explorerCourseProgress,
		isSuccess: isSuccessExplorerCourseProgress,
		isError: isErrorExplorerCourseProgress,
	} = useGetExplorerCourseProgressQuery(courseId!);
	
	const planets = explorerCourseProgress?.progress.planets;
	
	const isCurrentThemeInPlanets = useMemo(
		() => planets?.some((planet) => planet.courseThemeId === Number(themeId)),
		[planets, themeId]
	)!;
	
	const isCompletedCurrentTheme = planets?.[planets.length - 1].completed!;
	
	const isCompletedCurrentPlanet = useMemo(
		() => planets?.find((planet) => planet.courseThemeId.toString() === themeId)?.completed,
		[planets, themeId]
	)!;
	
	const isSkipThemeQuery = !themeId || !isCurrentThemeInPlanets;
	
	const isNoValidThemeId = !!planets && !!themeId && !isCurrentThemeInPlanets;
	
	const isSkipHomeworkQuery = !explorerCourseProgress?.groupId || !themeId;
	
	useEffect(() => {
		if (!isNoValidThemeId) return;
		
		navigate(getUrlThemeByCourseId({ courseId: courseId! }));
	}, [isNoValidThemeId]);
	
	const courseProgressData: CourseProgressData = {
		explorerCourseProgress,
		isSuccessExplorerCourseProgress,
		isErrorExplorerCourseProgress,
		planets,
		isCurrentThemeInPlanets,
		isSkipThemeQuery,
		isSkipHomeworkQuery,
		isNoValidThemeId,
		isCompletedCurrentTheme,
		isCompletedCurrentPlanet,
	};
	
	return (
		<CourseProgressContext.Provider value={courseProgressData}>
			{children}
		</CourseProgressContext.Provider>
	);
};