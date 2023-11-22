import { createContext } from 'react';
import {
	GetExplorerProgressResponseInterface
} from '@entities/course';

export type CourseProgressData = {
	explorerCourseProgress: GetExplorerProgressResponseInterface | undefined;
	isSuccess: boolean;
	isError: boolean;
	
	isCurrentThemeInPlanets: boolean;
	isSkipThemeQuery: boolean;
	isSkipHomeworkQuery: boolean;
	isNoValidThemeId: boolean;
	isCompletedCurrentSystem: boolean;
	isCompletedCurrentPlanet: boolean;
};

export const CourseProgressContext = createContext<CourseProgressData | null>(null);