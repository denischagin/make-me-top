import { Button } from '@shared/ui/Button';

import { ModalPlanetInterface } from '@entities/user/model/types';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/helpers/bem';

import { PlanetListProps } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';

export const PlanetList = (props: PlanetListProps) => {
    const {
        educationPlanetId,
        planetList,
        onPlanetClick,
        currentCourseId,
        allPlanetsLocked,
    } = props;

    const [block, element] = bem('planet-list');
    const navigate = useNavigate();

    const currentPlanetFromList = planetList?.find(
        (item) => item.planetId === educationPlanetId,
    );

    const getIsLocked = (planetNumber: number) => allPlanetsLocked || currentPlanetFromList &&
        planetNumber > currentPlanetFromList.planetNumber;

    const handleNavigateToCourse = () => {
        navigate(getUrlThemeByCourseIdAndThemeId({ courseId: currentCourseId, themeId: educationPlanetId! }));
    };

    return (
        <div className={block()}>
            {planetList?.map((planet, index) => (
                <div
                    key={planet.planetId}
                    className={element('item', {
                        active:
                            currentPlanetFromList &&
                            planet.planetNumber < currentPlanetFromList.planetNumber,
                        current: planet.planetId === educationPlanetId,
                    })}
                    onClick={() => {
                        onPlanetClick && !getIsLocked(planet.planetNumber) && onPlanetClick(planet.planetId);
                    }}
                >
                    <span className={element('name')}>
                        {++index}. {planet.planetName}
                    </span>
                    {getIsLocked(planet.planetNumber) && (
                        <LockIcon className={element('lock-icon')} />
                    )}
                    {planet.planetId === educationPlanetId && (
                        <div className={element('info')}>
								<span className={element('item-text')}>
                                    Текущая планета
								</span>
                            {
                                <Button
                                    title='Обучение'
                                    size={buttonSize.small}
                                    color={buttonColor.primary500}
                                    onClick={handleNavigateToCourse}
                                />
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
