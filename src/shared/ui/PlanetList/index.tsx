import { Button } from '@shared/ui/Button';

import { ModalPlanetInterface } from '@entities/user/model/types';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/helpers/bem';

import { PlanetListProps } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';

export const PlanetList = (props: PlanetListProps) => {
    const { currentPlanetId, planetList } = props;

    const [block, element] = bem('planet-list');

    // const planetList = useAppSelector(userPlanetListSelector);

    const currentPlanetFromList = planetList?.find(
        (item) => item.planetId === currentPlanetId,
    );
    return (
        <div className={block()}>
            {planetList?.map((planet: ModalPlanetInterface, index: number) => (
                <div
                    key={planet.planetId}
                    className={element('item', {
                        active:
                            currentPlanetFromList &&
                            planet.planetId < currentPlanetFromList.planetId,
                        current: planet.planetId === currentPlanetId,
                    })}
                >
                    <span className={element('name')}>
                        {++index}. {planet.planetName}
                    </span>
                    {currentPlanetFromList &&
                        planet.planetId > currentPlanetFromList.planetId && (
                            <LockIcon className={element('lock-icon')} />
                        )}
                    {planet.planetId === currentPlanetId && (
                        <div className={element('info')}>
                            <span className={element('item-text')}>
                                Текущая планета
                            </span>
                            <Button
                                title='Обучение'
                                size={buttonSize.small}
                                color={buttonColor.primary500}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
