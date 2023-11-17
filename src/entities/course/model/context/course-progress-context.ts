import { createContext } from 'react';
import { ExplorerProgressPlanetInterface } from '@entities/course';

export type CourseProgressData = {
	explorerCourseProgress: any;
	isSuccessExplorerCourseProgress: boolean;
	isErrorExplorerCourseProgress: boolean;
	planets: ExplorerProgressPlanetInterface[] | undefined;
	isCurrentThemeInPlanets: boolean;
	isSkipThemeQuery: boolean;
	isSkipHomeworkQuery: boolean;
	isNoValidThemeId: boolean;
	isCompletedCurrentTheme: boolean;
	isCompletedCurrentPlanet: boolean;
};

export const CourseProgressContext = createContext<CourseProgressData | null>(null);