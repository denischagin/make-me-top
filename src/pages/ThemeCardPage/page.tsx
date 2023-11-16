import { bem } from '@shared/utils/helpers/bem';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import NotFound from '@pages/NotFound';
import {
	useCourseProgress,
} from '@entities/course';
import { ThemeCardContent } from '@widgets/ThemeCardContent';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { ThemeCardTabs } from '@widgets/ThemeCardTabs';
import { ThemeCardHomework } from '@widgets/ThemeCardHomework/ui/ThemeCardHomework';


const ThemeCardPage = () => {
	const [block, element] = bem('theme-card-page');
	
	const {
		isErrorExplorerCourseProgress,
		explorerCourseProgress
	} = useCourseProgress();
	
	if (isErrorExplorerCourseProgress) return <NotFound />;
	
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
		</>
	);
};

export default ThemeCardPage;