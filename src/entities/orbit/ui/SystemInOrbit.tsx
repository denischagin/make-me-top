import React, {
    CSSProperties,
    memo,
    MouseEventHandler,
    TransitionEventHandler,
    useEffect,
    useMemo,
    useState,
} from 'react';
import System from '@shared/ui/System';

import { SystemType, UserProgressInGalaxy } from '@entities/galaxy/model/types';

import { getDigitalAngle } from '@entities/orbit/lib/getDigitalAngle';
import { getPercentageProgress } from '@entities/orbit/lib/getPercentageProgress';
import { getRadius } from '@entities/orbit/lib/getRadius';
import { getSystemChildData } from '@entities/orbit/lib/getSystemChildData';
import { getSystemColorByProgressType } from '@entities/orbit/lib/getSystemColorByProgressType';
import { getSystemParentData } from '@entities/orbit/lib/getSystemParentData';
import { getSystemProgressType } from '@entities/orbit/lib/getSystemProgressType';
import { getXCoordinateOnEllipse } from '@entities/orbit/lib/getXCoordinateOnEllipse';
import { getYCoordinateOnEllipse } from '@entities/orbit/lib/getYCoordinateOnEllipse';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/helpers/bem';

import { SystemProgressTypes } from '@shared/types/common';

import './styles.scss';
import { useAuth } from '@entities/viewer';
import { useGalaxy } from '@entities/galaxy/libs/hooks/useGalaxy';
import {
    ACTIVE_SYSTEM_MODIFIER,
    INACTIVE_SYSTEM_MODIFIER,
} from '@entities/galaxy/model/constants';

interface SystemInOrbitProps {
    system: SystemType;
    handleSystemClick: MouseEventHandler<HTMLDivElement>;
    handleSystemMouseEnter: MouseEventHandler<HTMLDivElement>;
    handleSystemMouseLeave: () => void;
    orbitHalfWidth: number;
    orbitHalfHeight: number;
    elementWidth: number;
    elementHeight: number;
    userProgress?: UserProgressInGalaxy;
    systemStyle?: CSSProperties;
}

const SystemInOrbit = (props: SystemInOrbitProps) => {
    const {
        system,
        handleSystemClick,
        handleSystemMouseEnter,
        handleSystemMouseLeave,
        orbitHalfWidth,
        orbitHalfHeight,
        elementWidth,
        elementHeight,
        userProgress,
        systemStyle,
    } = props;
    const { role } = useAuth();
    const { activeSystemsIds } = useGalaxy();

    const isGalaxyActive = activeSystemsIds.includes(system.systemId);

    // const isNoExplorer = role !== 'EXPLORER';
    const [destroyCount, setDestoryCount] = useState(0);
    const [randomDestroyClass, setRandomDestroyClass] = useState<string>();

    const destoryClasses = [
        'destroy1',
        'destroy2',
        'destroy3',
        'destroy4',
        'destroy5',
        'destroy6',
    ];
    const isDestroy = destroyCount >= 3;

    useEffect(() => {
        const randomClass = isDestroy
            ? destoryClasses[Math.floor(Math.random() * destoryClasses.length)]
            : undefined;

        setRandomDestroyClass(randomClass);
    }, [isDestroy]);

    const systemProgressType = !!userProgress
        ? getSystemProgressType({
              system,
              userProgress,
          })
        : undefined;

    const systemColor = getSystemColorByProgressType({
        systemProgressType,
    });

    const systemPercentageProgress = !!userProgress
        ? getPercentageProgress({
              system,
              userProgress,
          })
        : undefined;

    const digitalAngle = getDigitalAngle(system.systemPosition);

    const radius = getRadius({
        digitalAngle,
        halfWidth: orbitHalfWidth,
        halfHeight: orbitHalfHeight,
    });

    const x = getXCoordinateOnEllipse({
        ellipseHalfWidth: orbitHalfWidth,
        radius,
        digitalAngle,
        elementWidth,
    });

    const y = getYCoordinateOnEllipse({
        ellipseHalfHeight: orbitHalfHeight,
        radius,
        digitalAngle,
        elementHeight,
    });

    const handleGalaxyClick: MouseEventHandler<HTMLDivElement> = (e) => {
        handleSystemClick(e);
        setDestoryCount((prev) => prev + 1);
    };

    const handleTransitionEnd: TransitionEventHandler = (e) => {
        const property = e.propertyName;

        if (property === 'top' || property === 'left') {
            handleSystemMouseLeave();
        }
    };

    const [block, element] = bem('orbit');

    const children = useMemo(
        () => (
            <>
                {systemProgressType === SystemProgressTypes.SYSTEM_CLOSE && (
                    <LockIcon />
                )}
                <p
                    className={element(
                        'content-system--name',
                        systemPercentageProgress &&
                            systemPercentageProgress > 64
                            ? 'white'
                            : undefined,
                    )}
                >
                    {system.systemName}
                </p>
            </>
        ),
        [systemProgressType, system.systemName, systemPercentageProgress],
    );

    return (
        <div
            key={system.systemId}
            className={element('content-system', randomDestroyClass)}
            onClick={handleGalaxyClick}
            onMouseEnter={handleSystemMouseEnter}
            onMouseLeave={handleSystemMouseLeave}
            onTransitionEnd={handleTransitionEnd}
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
            <System
                percentageProgress={systemPercentageProgress}
                color={systemColor}
                className={
                    isGalaxyActive
                        ? ACTIVE_SYSTEM_MODIFIER
                        : INACTIVE_SYSTEM_MODIFIER
                }
            >
                {children}
            </System>
        </div>
    );
};

export default memo(
    SystemInOrbit,
    (prevProps, nextProps) =>
        prevProps.system.systemId === nextProps.system.systemId &&
        prevProps.orbitHalfWidth === nextProps.orbitHalfWidth &&
        prevProps.orbitHalfHeight === nextProps.orbitHalfHeight &&
        prevProps.elementWidth === nextProps.elementWidth &&
        prevProps.elementHeight === nextProps.elementHeight &&
        prevProps.userProgress === nextProps.userProgress &&
        prevProps.handleSystemClick === nextProps.handleSystemClick &&
        prevProps.handleSystemMouseLeave === nextProps.handleSystemMouseLeave &&
        prevProps.handleSystemMouseEnter === nextProps.handleSystemMouseEnter,
);
