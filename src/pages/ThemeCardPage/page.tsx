import { bem } from '@shared/utils/helpers/bem';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { Container } from '@shared/ui/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPlanetsBySystemIdQuery } from '@entities/galaxy/api/api';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';
import NotFound from '@pages/NotFound';
import { useGetCourseInfoByCourseIdQuery } from '@entities/course';
import { ThemeCardContent } from '@widgets/ThemeCardContent';
import { PlanetListTabs } from '@shared/ui/PlanetListTabs';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { ThemeCardHomework } from '@widgets/ThemeCardHomework/ui/ThemeCardHomework';

const ThemeCardPage = () => {
	const [block, element] = bem('theme-card-page');
	
	const { courseId, themeId } = useParams();
	const navigate = useNavigate();
	
	const {
		data: planets,
		isSuccess: isSuccessPlanets,
		isError: isErrorPlanets
	} = useGetPlanetsBySystemIdQuery(Number(courseId));
	
	const { data: courseInfo } = useGetCourseInfoByCourseIdQuery(Number(courseId));
	const handlePlanetClick = (planetId: number) =>
		navigate(getUrlThemeByCourseIdAndThemeId({ themeId: planetId, courseId: courseId! }));
	
	
	if (isErrorPlanets) return <NotFound />;
	
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
							{courseInfo?.title}
						</Typography>
						
						<div className={element('content')}>
							<PlanetListTabs
								planets={planets}
								onPlanetClick={handlePlanetClick}
								selectedPlanetId={Number(themeId)}
								educationPlanetId={6}
							/>
							
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