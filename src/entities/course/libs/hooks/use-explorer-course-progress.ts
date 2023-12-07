import { useContext } from 'react';
import { CourseProgressContext } from '@entities/course';

export const useExplorerCourseProgress = () => {
	const context = useContext(CourseProgressContext);
	if (!context) {
		throw new Error('useCourseProgressContext must be used within a CourseProgressProvider');
	}
	return context;
};
