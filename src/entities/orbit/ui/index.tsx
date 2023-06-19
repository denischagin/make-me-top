import { getDigitalAngle } from '@entities/orbit/lib/getDigitalAngle';
import { getPlanetChildData } from '@entities/orbit/lib/getPlanetChildData';
import { getPlanetParentData } from '@entities/orbit/lib/getPlanetParentData';
import { getRadius } from '@entities/orbit/lib/getRadius';
import { getXCoordinateOnEllipse } from '@entities/orbit/lib/getXCoordinateOnEllipse';
import { getYCoordinateOnEllipse } from '@entities/orbit/lib/getYCoordinateOnEllipse';

import React from 'react';

import { INACTIVE_PLANET } from '@entities/galaxy/model/constants';
import { SystemType } from '@entities/galaxy/model/types';

import { Star } from '@shared/Star';

import { starColor } from '@shared/Star/interfaces';

import '@entities/orbit/ui/styles.scss';

interface IOrbitProps {
    systemList: Array<SystemType>;
    orbitWidth: number;
    orbitHeight: number;
    planetStyle?: React.CSSProperties;
    handlePlanetMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
    handlePlanetMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Orbit: React.FC<IOrbitProps> = (props) => {
    const {
        systemList,
        orbitWidth,
        orbitHeight,
        planetStyle,
        handlePlanetMouseEnter,
        handlePlanetMouseLeave,
    } = props;

    const orbitHalfWidth = orbitWidth / 2;
    const orbitHalfHeight = orbitHeight / 2;

    const defaultElementWidth = 80;
    const defaultElementHeight = 80;

    return (
        <div className="orbit">
            <div
                className="orbit__content"
                style={{
                    width: orbitWidth + 'px',
                    height: orbitHeight + 'px',
                }}
            >
                {systemList.map((planet, index) => {
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
                            className="orbit__content_planet"
                            onMouseEnter={handlePlanetMouseEnter}
                            onMouseLeave={handlePlanetMouseLeave}
                            style={{
                                ...planetStyle,
                                left: x + 'px',
                                top: y + 'px',
                            }}
                            data-planet-id={planet.systemId}
                            data-planet-parent-list={getPlanetParentData(planet)}
                            data-planet-children-list={getPlanetChildData(planet)}
                            data-is-active={INACTIVE_PLANET}
                        >
                            <Star
                                color={starColor.white}
                                children={<div>{planet.systemName}</div>}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orbit;
