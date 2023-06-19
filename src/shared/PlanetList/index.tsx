import { useAppSelector } from '@app/providers/store/hooks';

import { userPlanetListSelector } from '@entities/user/model/selectors';
import { ModalPlanetInterface } from '@entities/user/model/types';

import { Button } from '@shared/Button';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/bem';

import { PlanetListInterface } from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

import './styles.scss';

export const PlanetList = (props: PlanetListInterface) => {
    const [block, element] = bem('planet-list');

    const planetList = useAppSelector(userPlanetListSelector);

    const currentPlanet = planetList.find((item: ModalPlanetInterface) => item.planetName === props.currentPlanet);

    return (
        <div className={block()}>
            {planetList.map((planet: ModalPlanetInterface, index: number) => (
                <div
                    key={planet.planetId}
                    className={element('item', {
                        active: planet.planetId < currentPlanet?.planetId!,
                        current: planet.planetName === props.currentPlanet,
                    })}
                >
                    <span className={element('name')}>
                        {++index}. {planet.planetName}
                    </span>
                    {planet.planetId > currentPlanet?.planetId! && <LockIcon className={element('lock-icon')} />}
                    {planet.planetName === props.currentPlanet && (
                        <div className={element('info')}>
                            <span className={element('item-text')}>Текущая планета</span>
                            <Button
                                title="Проверить"
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
