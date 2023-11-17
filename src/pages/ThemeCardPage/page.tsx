import { bem } from '@shared/utils/helpers/bem';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import NotFound from '@pages/NotFound';
import {
	CourseProgressProvider,
	useGetExplorerCourseProgressQuery,
} from '@entities/course';
import { ThemeCardContent } from '@widgets/ThemeCardContent';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { ThemeCardTabs } from '@widgets/ThemeCardTabs';
import { ThemeCardHomework } from '@widgets/ThemeCardHomework/ui/ThemeCardHomework';
import { useParams } from 'react-router-dom';


const ThemeCardPage = () => {
	const [block, element] = bem('theme-card-page');
	const { courseId } = useParams();
	
	const {
		data: explorerCourseProgress,
		isSuccess: isSuccessExplorerCourseProgress,
		isError: isErrorExplorerCourseProgress,
	} = useGetExplorerCourseProgressQuery(courseId!);
	
	if (isErrorExplorerCourseProgress) return <NotFound />;
	
	return (
		<CourseProgressProvider>
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
							<ThemeCardTabs />
							
							<div>
								<ThemeCardContent />
								
								<DividingLine color={DividingLineColor.opacitygray} />
								
								<ThemeCardHomework />
							</div>
						</div>
					</div>
				</Container>
			</div>
		</CourseProgressProvider>
	);
};

export default ThemeCardPage;