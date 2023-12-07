import { PlanetListTabs } from '@shared/ui/PlanetListTabs';
import { useExplorerCourseProgress, useGetExplorerCourseProgressQuery } from '@entities/course';
import { getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';
import NotFound from '@pages/NotFound';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPlanetsBySystemIdQuery } from '@entities/galaxy/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAuth } from '@entities/viewer';
import { mappingListPlanetToListTheme } from '@entities/course/model/mappings';
import { useMemo } from 'react';

export const ThemeTabs = () => {
	const { courseId, themeId } = useParams();
	const { role } = useAuth();
	const navigate = useNavigate();
	
	const { explorerCourseProgress, isCompletedCurrentSystem } =
		useExplorerCourseProgress();
	const {
		data: planets
	} = useGetPlanetsBySystemIdQuery(courseId!, {
		skip: role !== 'KEEPER' || !courseId
	});
	
	const handlePlanetClick = (planetId: number) =>
		navigate(getUrlThemeByCourseIdAndThemeId({ themeId: planetId, courseId: courseId! }));
	const currentThemeId = explorerCourseProgress?.currentThemeId ?? undefined;
	
	const mappingPlanets = useMemo(() =>
			mappingListPlanetToListTheme(planets ?? []),
		[planets]);
	
	return (
		<PlanetListTabs
			themes={explorerCourseProgress?.progress.planets || mappingPlanets}
			onPlanetClick={handlePlanetClick}
			selectedPlanetId={Number(themeId)}
			educationPlanetId={isCompletedCurrentSystem ? undefined : currentThemeId}
		/>
	);
};