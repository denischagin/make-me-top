import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useGetExplorerCourseProgressQuery } from '@entities/course';
import { getUrlThemeByCourseId } from '@shared/constants/links';

export const useCourseProgress = () => {
	const { courseId, themeId } = useParams();
	
	const navigate = useNavigate();
	
	const {
		data: explorerCourseProgress,
		isSuccess: isSuccessExplorerCourseProgress,
		isError: isErrorExplorerCourseProgress
	} = useGetExplorerCourseProgressQuery(courseId!);
	
	const planets = explorerCourseProgress?.progress.planets;
	
	const isCurrentThemeInPlanets = useMemo(() =>
			planets?.some((planet) => planet.courseThemeId === Number(themeId)),
		[planets, themeId]
	);
	
	const isSkipThemeQuery = !themeId || !isCurrentThemeInPlanets;
	
	const isNoValidThemeId = !!planets && !!themeId && !isCurrentThemeInPlanets;
	
	const isSkipHomeworkQuery = !explorerCourseProgress?.groupId || !themeId
	
	useEffect(() => {
		if (!isNoValidThemeId) return;
		
		navigate(getUrlThemeByCourseId({ courseId: courseId! }));
	}, [isNoValidThemeId]);
	
	return {
		explorerCourseProgress,
		isSuccessExplorerCourseProgress,
		isErrorExplorerCourseProgress,
		planets,
		isCurrentThemeInPlanets,
		isSkipThemeQuery,
		isSkipHomeworkQuery,
		isNoValidThemeId,
	};
};
