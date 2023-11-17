import { PlanetListTabs } from '@shared/ui/PlanetListTabs';
import { useCourseProgress, useGetExplorerCourseProgressQuery } from '@entities/course';
import { getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';
import NotFound from '@pages/NotFound';
import { useNavigate, useParams } from 'react-router-dom';

export const ThemeCardTabs = () => {
	const { courseId, themeId } = useParams();
	const navigate = useNavigate();
	
	const { explorerCourseProgress, isCompletedCurrentTheme } =
		useCourseProgress();
	
	const handlePlanetClick = (planetId: number) =>
		navigate(getUrlThemeByCourseIdAndThemeId({ themeId: planetId, courseId: courseId! }));
	const currentThemeId = explorerCourseProgress?.currentThemeId;
	
	return (
		<PlanetListTabs
			themes={explorerCourseProgress?.progress.planets}
			onPlanetClick={handlePlanetClick}
			selectedPlanetId={Number(themeId)}
			educationPlanetId={isCompletedCurrentTheme ? undefined : currentThemeId}
		/>
	
	);
};