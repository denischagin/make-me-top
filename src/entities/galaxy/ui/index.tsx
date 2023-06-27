import React,
{
    useEffect,
    useState,
} from 'react';
import { TabPanel } from 'react-tabs';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { userIsModalOpenSelector } from '@entities/user/model/selectors';
import { showModal } from '@entities/user/model/slice';
import { UserProgress } from '@entities/user/model/types';

import { addActivePlanet } from '@entities/galaxy/lib/addActivePlanet';
import { createSvgContainer } from '@entities/galaxy/lib/createSvgContainer';
import { deleteAllConnectionLines } from '@entities/galaxy/lib/deleteAllConnectionLines';
import { isChosenStarClosed } from '@entities/galaxy/lib/isChosenStarClosed';
import { setStarsActivity } from '@entities/galaxy/lib/setStarsActivity';
import { showPlanetsChildren } from '@entities/galaxy/lib/showPlanetsChildren';
import { showPlanetsParents } from '@entities/galaxy/lib/showPlanetsParents';
import { DEFAULT_CHOSEN_STAR } from '@entities/galaxy/model/constants';
import {
    OrbitType,
    SystemType,
} from '@entities/galaxy/model/types';

import { CircleModal } from '@shared/CircleModal';
import { MmtTabs } from '@shared/MmtTabs';
import { Modal } from '@shared/Modal';

import { bem } from '@shared/utils/bem';

import { TABS_LIST } from '@pages/Explorer/model';

import { SystemProgressTypes } from '@shared/types/common';

import {
    DATA_PLANET_CHILDREN_LIST,
    DATA_PLANET_ID,
    DATA_PLANET_PARENT_LIST,
    DATA_PLANET_PROGRESS_TYPE,
} from '@entities/orbit/model/types';

import './style.scss';
import { fetchSystemById } from '@entities/orbit/api/fetchSystemById';
import Orbit from '@entities/orbit/ui';

interface IGalaxyProps {
  galaxyPage: HTMLDivElement | null;
  userProgress: UserProgress;
  orbitList: Array<OrbitType>;
  svgContainerClass: string;
  width: number;
  height: number;
  planetWidth?: number;
  planetHeight?: number;
}

interface IGalaxyOrbitSettings {
  width: number;
  planetWidth: number;
  backgroundWidth: number;
  height: number;
  planetHeight: number;
  backgroundHeight: number;
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
    const {
        svgContainerClass,
        galaxyPage,
        userProgress,
        orbitList,
        width,
        height,
    } = props;

    const [block, element] = bem('galaxy');

    const dispatch = useAppDispatch();

    const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null);
    const [activeSystemsId, setActiveSystemsId] = useState<Array<number>>([]);
    const [stars, setStars] = useState<NodeListOf<HTMLDivElement>>(
        document.querySelectorAll('.star__orbit.star__orbit--activity-inactive'),
    );
    const [lastChosenStar, setLastChosenStar] =
    useState<SystemType>(DEFAULT_CHOSEN_STAR);
    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    //что бы последняя орбита с планетами не была 0x0, уменьшаем шаг между орбитами,
    //увеличив кол-во орбит в подсчетах на 1
    const orbitWidthStep = width / (orbitList.length + 1);
    const orbitHeightStep = height / (orbitList.length + 1);

    const galaxyOrbitSettings: IGalaxyOrbitSettings = {
        width,
        planetWidth: props.planetWidth || 80,
        backgroundWidth: width + orbitWidthStep / 2,
        height,
        planetHeight: props.planetWidth || 80,
        backgroundHeight: height + orbitHeightStep / 2,
    };

    useEffect(() => {
        //создание контейнера под линии связи,
        //контейнер создается в корне страницы, для соответствия ее размерам
        setSvgContainer(
            createSvgContainer({
                galaxyPage,
                svgContainerClass,
            }),
        );
    }, [galaxyPage]);

    useEffect(() => {
        setStars(
            document.querySelectorAll(
                '.star__orbit.star__orbit--activity-inactive , .star__orbit.star__orbit--activity-active',
            ),
        );
    }, [activeSystemsId]);

    useEffect(() => {
        setStarsActivity({
            stars,
            activeSystemsId,
        });
    }, [stars, activeSystemsId]);

    const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const targetId = currentTarget.getAttribute(DATA_PLANET_ID);
        const childrenList = currentTarget.getAttribute(DATA_PLANET_CHILDREN_LIST);
        const parentsList = currentTarget.getAttribute(DATA_PLANET_PARENT_LIST);
        const planetProgressType = currentTarget.getAttribute(
            DATA_PLANET_PROGRESS_TYPE,
        );

        addActivePlanet({
            activePlanetId: targetId,
            setActivePlanets: setActiveSystemsId,
        });

        if (
            planetProgressType === SystemProgressTypes.SYSTEM_OPEN ||
      planetProgressType === SystemProgressTypes.SYSTEM_EDUCATION
        ) {
            showPlanetsChildren({
                childrenList,
                currentTarget,
                planetWidth: galaxyOrbitSettings.planetWidth,
                planetHeight: galaxyOrbitSettings.planetHeight,
                svgContainer,
                setActivePlanets: setActiveSystemsId,
            });
        }

        if (planetProgressType === SystemProgressTypes.SYSTEM_CLOSE) {
            showPlanetsParents({
                parentsList,
                currentTarget,
                planetWidth: galaxyOrbitSettings.planetWidth,
                planetHeight: galaxyOrbitSettings.planetHeight,
                svgContainer,
                setActivePlanets: setActiveSystemsId,
            });
        }
    };

    const handlePlanetMouseLeave = () => {
        setActiveSystemsId([]);

        deleteAllConnectionLines({
            svgContainer,
        });
    };

    const handlePlanetClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const targetId = Number(currentTarget.getAttribute(DATA_PLANET_ID));

        setLastChosenStar(DEFAULT_CHOSEN_STAR);

        dispatch(showModal());

        fetchSystemById({
            id: targetId,
        }).then((response) => {
            if (response === undefined) {
                return setLastChosenStar({
                    ...DEFAULT_CHOSEN_STAR,
                    systemName: 'Not found.',
                });
            }

            setLastChosenStar(response.data);
        });
    };

    return (
        <div
            className={block()}
            style={{
                width,
                height,
            }}
        >
            {isModalOpen &&
            <CircleModal
                header={lastChosenStar.systemName}
                onClose={() => dispatch(showModal())}
            >
                {<div></div>}
            </CircleModal>}
            <div
                className={element('background')}
                style={{
                    width: galaxyOrbitSettings.width,
                    height: galaxyOrbitSettings.height,
                }}
            />
            {orbitList.map((orbits) => {
                galaxyOrbitSettings.width -= orbitWidthStep;
                galaxyOrbitSettings.height -= orbitHeightStep;

                return (
                    <Orbit
                        key={orbits.orbitId}
                        userProgress={userProgress}
                        systemList={orbits.systemList}
                        orbitWidth={galaxyOrbitSettings.width}
                        orbitHeight={galaxyOrbitSettings.height}
                        planetStyle={{
                            width: galaxyOrbitSettings.planetWidth + 'px',
                            height: galaxyOrbitSettings.planetHeight + 'px',
                        }}
                        handlePlanetClick={handlePlanetClick}
                        handlePlanetMouseEnter={handlePlanetMouseEnter}
                        handlePlanetMouseLeave={handlePlanetMouseLeave}
                    />
                );
            })}
        </div>
    );
};

export default Galaxy;
