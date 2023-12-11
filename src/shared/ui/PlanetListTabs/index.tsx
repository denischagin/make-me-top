import { bem } from '@shared/utils/helpers/bem';
import { PlanetListTabsProps } from '@shared/ui/PlanetListTabs/interface';
import { ReactComponent as LockIcon } from '@shared/images/lock-white.svg';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';

export const PlanetListTabs = (props: PlanetListTabsProps) => {
    const {
        selectedPlanetId,
        educationPlanetId,
        status,
        onPlanetClick,
        themes,
    } = props;

    const [block, element] = bem('planet-list-tabs');

    const currentThemeFromList = themes?.find(
        (item) => item.courseThemeId === educationPlanetId,
    );

    const getIsLocked = (planetNumber: number) =>
        currentThemeFromList?.courseThemeNumber! < planetNumber;

    return (
        <div className={block()}>
            {themes?.map((planet, index) => (
                <div
                    key={planet.courseThemeId}
                    className={element('item', {
                        education: planet.courseThemeId === educationPlanetId,
                        selected: planet.courseThemeId === selectedPlanetId,
                    })}
                    onClick={() => !getIsLocked(planet.courseThemeNumber) && onPlanetClick && onPlanetClick(planet.courseThemeId)}
                >
                    <div>
                        <p>
                            {index + 1}. {planet.title}
                        </p>

                        {getIsLocked(planet.courseThemeNumber) &&
                            <LockIcon className={element('lock-icon')} />}

                            <Typography variant={typographyVariant.regular14} color={typographyColor.primary500}
                                        className={element('waiting-text')}>
                                Ожидает оценки
                            </Typography>
                    </div>


                </div>
            ))}
        </div>
    );
};