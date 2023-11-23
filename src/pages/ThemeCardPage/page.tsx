import { bem } from '@shared/utils/helpers/bem';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import NotFound from '@pages/NotFound';
import {
	CourseProgressProvider, useCourseProgress,
} from '@entities/course';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { ThemeTabs } from '@widgets/ThemeTabs';
import { ThemeContent } from '@widgets/ThemeContent';
import { useAuth } from '@entities/viewer';
import { HomeworkIssues } from '@widgets/HomeworkIssues';
import { CurrentHomeworkRequests } from '@widgets/CurrentHomeworkRequests/ui/CurrentHomeworkRequests';
import { OldHomeworksRequest } from '@widgets/OldHomeworksRequest/ui/OldHomeworksRequests';
import { roles } from '@shared/constants/storageKeys';
import { ReactElement } from 'react';


const homeworkSectionForRole: Record<roles, ReactElement> = {
	EXPLORER: (
		<>
			<HomeworkIssues />
		</>
	),
	KEEPER: (
		<>
			<CurrentHomeworkRequests />
			<OldHomeworksRequest />
		</>
	)
};

const ThemeCardPage = () => {
	const [block, element] = bem('theme-card-page');
	const { role } = useAuth();
	
	const {
		explorerCourseProgress,
		isError,
	} = useCourseProgress();
	
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
							{explorerCourseProgress?.progress.title}
						</Typography>
						
						<div className={element('content')}>
							<ThemeTabs />
							
							<div>
								<ThemeContent />
								
								<DividingLine color={DividingLineColor.opacitygray} />
								
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