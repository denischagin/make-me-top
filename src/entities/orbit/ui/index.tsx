import React,
{
    memo,
    useState,
} from 'react';

import {
    SystemType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

import { bem } from '@shared/utils/bem';
import { elementToNumber } from '@shared/utils/elementToNumber';

import SystemInOrbit from './SystemInOrbit';

import './styles.scss';

interface IOrbitProps {
	userProgress: UserProgressInGalaxy;
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

    const [active, setActive] = useState(false);

    const [block, element] = bem('orbit');

    const orbitHalfWidth = orbitWidth / 2;
    const orbitHalfHeight = orbitHeight / 2;

    const elementWidth = elementToNumber({
        element: systemStyle?.width,
    });

    const elementHeight = elementToNumber({
        element: systemStyle?.height,
    });

    return (
        <div
            className={block({
                active,
            })}
            onAnimationEnd={() => !active && setActive(true)}
        >
            <div
                className={element('content')}
                style={{
                    width: orbitWidth + 'px',
                    height: orbitHeight + 'px',
                }}
            >
                {systemList.map((system) => (
                    <SystemInOrbit
                        key={system.systemId}
                        elementHeight={elementHeight}
                        elementWidth={elementWidth}
                        handleSystemClick={handleSystemClick}
                        handleSystemMouseEnter={handleSystemMouseEnter}
                        handleSystemMouseLeave={handleSystemMouseLeave}
                        orbitHalfHeight={orbitHalfHeight}
                        orbitHalfWidth={orbitHalfWidth}
                        system={system}
                        systemStyle={systemStyle}
                        userProgress={userProgress}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(Orbit);
