import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { Fragment, useMemo } from 'react';
import { getUrlThemeByCourseId, getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetPlanetsBySystemIdQuery } from '@entities/galaxy/api/api';
import { useGetThemeByThemeIdQuery } from '@entities/theme';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';

export const ThemeCardContent = () => {
	const { courseId, themeId } = useParams();
	const navigate = useNavigate();
	
	const [block, element] = bem('theme-card-content');
	
	const {
		data: planets,
		isSuccess: isSuccessPlanets,
		isError: isErrorPlanets
	} = useGetPlanetsBySystemIdQuery(Number(courseId));
	
	
	const isCurrentThemeInPlanets = useMemo(() =>
			planets?.some((planet) => planet.planetId === Number(themeId)),
		[planets, themeId]);
	
	const { data: themeInfo } = useGetThemeByThemeIdQuery(Number(themeId), {
		skip: !themeId || !isCurrentThemeInPlanets,
	});
	
	
	const contentItems = themeInfo?.content.split('\n');
	
	return (
		<div className={block()}>
			
			<div className={element('theme-content')}>
				{!!planets && !!themeId && !isCurrentThemeInPlanets &&
				  <Navigate to={getUrlThemeByCourseId({ courseId: courseId! })} />
				}
				
				{!!themeId ?
					(
						<div>
							<div className={element('theme-title-wrapper')}>
								<Typography
									variant={typographyVariant.h2}
									color={typographyColor.white}
									className={element('theme-title')}
								>
									{themeInfo?.title}
								</Typography>
								
								<Typography
									variant={typographyVariant.medium16}
									color={typographyColor.white}
								>
									{themeInfo?.description}
								</Typography>
								
								<DividingLine color={DividingLineColor.opacitygray} />
							</div>
							
							
							<div
								className={element('theme-text')}
							>
								{contentItems?.map((contentItem, index) =>
									index === 0
										?
										<p key={index}>
											{contentItem}
										</p>
										: <Fragment key={index}>
											<br /> {contentItem !== '' && <p>{contentItem}</p>}
										</Fragment>)}
							</div>
						
						</div>
					)
					: (
						isSuccessPlanets &&
						(
							<div className={element('theme-title-wrapper')}>
								<Typography variant={typographyVariant.h2}>Выберите нужную тему</Typography>
							</div>
						)
					)
				}
			</div>
		</div>
	);
};