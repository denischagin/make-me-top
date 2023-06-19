import Orbit from '@entities/orbit/ui';

import React,
{
    createRef,
    useEffect,
    useRef,
    useState,
} from 'react';

import { deleteAllConnectionLines } from '@entities/galaxy/lib/deleteAllConnectionLines';
import { getElemCoords } from '@entities/galaxy/lib/getElemCoords';
import { hidePlanetsChildren } from '@entities/galaxy/lib/hidePlanetsChildren';
import { hidePlanetsParents } from '@entities/galaxy/lib/hidePlanetsParents';
import { showPlanetsChildren } from '@entities/galaxy/lib/showPlanetsChildren';
import { showPlanetsParents } from '@entities/galaxy/lib/showPlanetsParents';
import {
    ACTIVE_PLANET,
    INACTIVE_PLANET,
    SVG_ELEMENT,
} from '@entities/galaxy/model/constants';
import { OrbitType } from '@entities/galaxy/model/types';

import './style.scss';

interface IGalaxyProps {
    orbitList: Array<OrbitType>;
    width: number;
    height: number;
    planetWidth: number;
    planetHeight: number;
}

interface IGalaxyOrbitSettings {
    viewBox: string;
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
    const {
        orbitList,
        width,
        height,
        planetWidth,
        planetHeight,
    } = props;

    const svgContainerRef = createRef<SVGSVGElement>();

    const [viewBoxOffsetX, setViewBoxOffsetX] = useState<number>(0);
    const [viewBoxOffsetY, setViewBoxOffsetY] = useState<number>(0);

    //что бы последняя орбита с планетами не была 0x0, уменьшаем шаг между орбитами,
    //увеличив кол-во орбит в подсчетах на 1
    const orbitWidthStep = width / (orbitList.length + 1);
    const orbitHeightStep = height / (orbitList.length + 1);

    const galaxyOrbitSettingsRef = useRef<IGalaxyOrbitSettings>({
        viewBox: `0 0 ${width} ${height}`,
    });

    useEffect(() => {
        setViewBoxOffsetX(
            getElemCoords({
                elem: svgContainerRef.current,
                type: SVG_ELEMENT,
            })!.left,
        );

        setViewBoxOffsetY(
            getElemCoords({
                elem: svgContainerRef.current,
                type: SVG_ELEMENT,
            })!.top,
        );
    }, []);

    const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const childrenList = currentTarget.getAttribute('data-planet-children-list');
        const parentsList = currentTarget.getAttribute('data-planet-parent-list');

        event.currentTarget.setAttribute('data-is-active', ACTIVE_PLANET);

        showPlanetsChildren({
            childrenList,
            currentTarget,
            planetWidth,
            planetHeight,
            viewBoxOffsetX,
            viewBoxOffsetY,
            svgContainer: svgContainerRef.current,
        });

        showPlanetsParents({
            parentsList,
            currentTarget,
            planetWidth,
            planetHeight,
            viewBoxOffsetX,
            viewBoxOffsetY,
            svgContainer: svgContainerRef.current,
        });
    };

    const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const childrenList = currentTarget.getAttribute('data-planet-children-list');
        const parentsList = currentTarget.getAttribute('data-planet-parent-list');

        event.currentTarget.setAttribute('data-is-active', INACTIVE_PLANET);

        hidePlanetsChildren({
            childrenList,
        });

        hidePlanetsParents({
            parentsList,
        });

        deleteAllConnectionLines({
            svgContainer: svgContainerRef.current,
        });
    };

    return (
        <div
            className="galaxy"
            style={{
                width,
                height,
            }}
        >
            <div
                className="galaxy__background"
                style={{
                    width,
                    height,
                }}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="galaxy__svg-container"
                viewBox={galaxyOrbitSettingsRef.current.viewBox}
                width={width}
                height={height}
                ref={svgContainerRef}
            />
            {orbitList.map((orbits) => {
                return (
                    <Orbit
                        key={orbits.orbitId}
                        systemList={orbits.systemList}
                        orbitWidth={width - orbitWidthStep * orbits.orbitId}
                        orbitHeight={height - orbitHeightStep * orbits.orbitId}
                        planetStyle={{
                            color: 'white',
                            width: planetWidth + 'px',
                            height: planetHeight + 'px',
                        }}
                        handlePlanetMouseEnter={handlePlanetMouseEnter}
                        handlePlanetMouseLeave={handlePlanetMouseLeave}
                    />
                );
            })}
        </div>
    );
};

export default Galaxy;
