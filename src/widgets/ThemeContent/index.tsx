import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useGetThemeByThemeIdQuery } from '@entities/theme';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { useExplorerCourseProgress } from '@entities/course';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';

export const ThemeContent = () => {
    const [block, element] = bem('theme-card-content');

    const { themeId } = useParams();

    const { isSkipThemeQuery } = useExplorerCourseProgress();

    const { data: themeInfo, isError: isErrorTheme } = useGetThemeByThemeIdQuery(Number(themeId), {
        skip: isSkipThemeQuery,
    });

    if (isErrorTheme)
        return null;

    return (
        <>
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
                                    <TypographyWithEnter
                                        variant={typographyVariant.regular14}
                                        parseLink
                                    >
                                        {themeInfo?.content === '' ? 'У данной темы пока еще нет контента' : themeInfo?.content}
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

            <DividingLine color={DividingLineColor.opacitygray} />
        </>
    );
};