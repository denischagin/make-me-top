import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useGetThemeByThemeIdQuery } from '@entities/theme';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { useCourseProgress } from '@entities/course';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';

export const ThemeContent = () => {
	const [block, element] = bem('theme-card-content');
	
	const { themeId } = useParams();
	
	const { isSkipThemeQuery, isSuccess } = useCourseProgress();
	
	const { data: themeInfo } = useGetThemeByThemeIdQuery(Number(themeId), {
		skip: isSkipThemeQuery,
	});
	
	return (
		<div className={block()}>
			<div className={element('theme-content')}>
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
							
							<div className={element('theme-text')}>
								<TypographyWithEnter variant={typographyVariant.regular14}>
									{themeInfo?.content}
								</TypographyWithEnter>
							</div>
						</div>
					) : (
						<div className={element('theme-title-wrapper')}>
							<Typography variant={typographyVariant.h2}>Выберите нужную тему</Typography>
						</div>
					)
				}
			</div>
		</div>
	);
};