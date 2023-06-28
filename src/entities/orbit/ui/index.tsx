import React from 'react';

import { UserProgress } from '@entities/user/model/types';

import { SystemType } from '@entities/galaxy/model/types';

import { Star } from '@shared/Star';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/bem';

import { SystemProgressTypes } from '@shared/types/common';

import './styles.scss';

import { getDigitalAngle } from '@entities/orbit/lib/getDigitalAngle';
import { getPercentageProgress } from '@entities/orbit/lib/getPercentageProgress';
import { getPlanetChildData } from '@entities/orbit/lib/getPlanetChildData';
import { getPlanetParentData } from '@entities/orbit/lib/getPlanetParentData';
import { getRadius } from '@entities/orbit/lib/getRadius';
import { getSystemColorByProgressType } from '@entities/orbit/lib/getSystemColorByProgressType';
import { getSystemProgressType } from '@entities/orbit/lib/getSystemProgressType';
import { getXCoordinateOnEllipse } from '@entities/orbit/lib/getXCoordinateOnEllipse';
import { getYCoordinateOnEllipse } from '@entities/orbit/lib/getYCoordinateOnEllipse';

interface IOrbitProps {
    userProgress: UserProgress;
    systemList: Array<SystemType>;
    orbitWidth: number;
    orbitHeight: number;
    systemStyle?: React.CSSProperties;
    handleSystemClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleSystemMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleSystemMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Orbit: React.FC<IOrbitProps> = (props) => {
    const {
        userProgress,
        systemList,
        orbitWidth,
        orbitHeight,
        systemStyle,
        handleSystemClick,
        handleSystemMouseEnter,
        handleSystemMouseLeave,
    } = props;

    const [block, element] = bem('orbit');

    const orbitHalfWidth = orbitWidth / 2;
    const orbitHalfHeight = orbitHeight / 2;

    const defaultElementWidth = 80;
    const defaultElementHeight = 80;

    return (
        <div className={block()}>
            <div
                className={element('content')}
                style={{
                    width: orbitWidth + 'px',
                    height: orbitHeight + 'px',
                }}
            >
                {systemList.map((planet) => {
                    const planetProgressType = getSystemProgressType({
                        system: planet,
                        userProgress,
                    });

                    const planetColor = getSystemColorByProgressType({
                        systemProgressType: planetProgressType,
                    });

                    const planetPercentageProgress = getPercentageProgress({
                        planet,
                        userProgress,
                    });

                    const digitalAngle = getDigitalAngle(planet.positionSystem);

                    const radius = getRadius({
                        digitalAngle,
                        halfWidth: orbitHalfWidth,
                        halfHeight: orbitHalfHeight,
                    });

                    const x = getXCoordinateOnEllipse({
                        ellipseHalfWidth: orbitHalfWidth,
                        radius,
                        digitalAngle,
                        elementWidth: defaultElementWidth,
                    });

                    const y = getYCoordinateOnEllipse({
                        ellipseHalfHeight: orbitHalfHeight,
                        radius,
                        digitalAngle,
                        elementHeight: defaultElementHeight,
                    });

                    return (
                        <div
                            key={planet.systemId}
                            className={element('content-system')}
                            onClick={handleSystemClick}
                            onMouseEnter={handleSystemMouseEnter}
                            onMouseLeave={handleSystemMouseLeave}
                            style={{
                                ...systemStyle,
                                left: x + 'px',
                                top: y + 'px',
                            }}
                            data-system-id={planet.systemId}
                            data-system-parent-list={getPlanetParentData(planet)}
                            data-system-children-list={getPlanetChildData(planet)}
                            data-system-progress-type={planetProgressType}
                        >
                            <Star
                                percentageProgress={planetPercentageProgress}
                                color={planetColor}
                            >
                                {planetProgressType === SystemProgressTypes.SYSTEM_CLOSE && (
                                    <LockIcon/>
                                )}
                                <p className={element('content-system--name')}>
                                    {planet.systemName}
                                </p>
                            </Star>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orbit;