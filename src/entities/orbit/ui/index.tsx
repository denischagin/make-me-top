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
import { getRadius } from '@entities/orbit/lib/getRadius';
import { getSystemChildData } from '@entities/orbit/lib/getSystemChildData';
import { getSystemColorByProgressType } from '@entities/orbit/lib/getSystemColorByProgressType';
import { getSystemParentData } from '@entities/orbit/lib/getSystemParentData';
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
                {systemList.map((system) => {
                    const systemProgressType = getSystemProgressType({
                        system,
                        userProgress,
                    });

                    const systemColor = getSystemColorByProgressType({
                        systemProgressType,
                    });

                    const systemPercentageProgress = getPercentageProgress({
                        system,
                        userProgress,
                    });

                    const digitalAngle = getDigitalAngle(system.positionSystem);

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
                            key={system.systemId}
                            className={element('content-system')}
                            onClick={handleSystemClick}
                            onMouseEnter={handleSystemMouseEnter}
                            onMouseLeave={handleSystemMouseLeave}
                            style={{
                                ...systemStyle,
                                left: x + 'px',
                                top: y + 'px',
                            }}
                            data-system-id={system.systemId}
                            data-system-parent-list={getSystemParentData(system)}
                            data-system-children-list={getSystemChildData(system)}
                            data-system-progress-type={systemProgressType}
                        >
                            <Star
                                percentageProgress={systemPercentageProgress}
                                color={systemColor}
                            >
                                {systemProgressType === SystemProgressTypes.SYSTEM_CLOSE && (
                                    <LockIcon/>
                                )}
                                <p className={element('content-system--name')}>
                                    {system.systemName}
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