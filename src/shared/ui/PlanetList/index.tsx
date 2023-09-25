import { useAppSelector } from '@app/providers/store/hooks';

import { DEFAULT_ID } from '@entities/user/model/constants';
import { userPlanetListSelector } from '@entities/user/model/selectors';
import { ModalPlanetInterface } from '@entities/user/model/types';

import { Button } from '@shared/ui/Button';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/bem';

import { PlanetListInterface } from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';

import './styles.scss';

export const PlanetList = (props: PlanetListInterface) => {
    const {
        currentPlanet,
    } = props;

    const [block, element] = bem('planet-list');

    const planetList = useAppSelector(userPlanetListSelector);

    const currentPlanetFromList = planetList?.find((item: ModalPlanetInterface) => item.planetName === currentPlanet) || {
        planetId: DEFAULT_ID,
    };

    return (
        <div className={block()}>
            {planetList.map((planet: ModalPlanetInterface, index: number) => (
                <div
                    key={planet.planetId}
                    className={element('item', {
                        active: planet.planetId < currentPlanetFromList.planetId,
                        current: planet.planetName === currentPlanet,
                    })}
                >
                    <span className={element('name')}>
                        {++index}. {planet.planetName}
                    </span>
                    {
                        (planet.planetId > currentPlanetFromList.planetId) &&
                        <LockIcon className={element('lock-icon')} />
                    }
                    {
                        planet.planetName === currentPlanet &&
                        <div className={element('info')}>
                            <span className={element('item-text')}>Текущая планета</span>
                            <Button
                                title="Проверить"
                                size={buttonSize.small}
                                color={buttonColor.primary500}
                            />
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};
