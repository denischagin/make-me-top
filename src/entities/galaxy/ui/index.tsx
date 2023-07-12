import React,
{
    useEffect,
    useState,
} from 'react';

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
import { setStarsActivityToActive } from '@entities/galaxy/lib/setStarsActivityToActive';
import { setStarsActivityToInactive } from '@entities/galaxy/lib/setStarsActivityToInactive';
import { showPlanetsChildren } from '@entities/galaxy/lib/showPlanetsChildren';
import { showPlanetsParents } from '@entities/galaxy/lib/showPlanetsParents';
import {
    DEFAULT_CHOSEN_STAR,
    DEFAULT_SYSTEM_RESPONSE_MESSAGE,
    STAR_CLASS,
} from '@entities/galaxy/model/constants';
import {
    OrbitType,
    SystemType,
} from '@entities/galaxy/model/types';

import {
    fetchSystemById,
    SystemResponseInterface,
} from '@entities/orbit/api/fetchSystemById';
import {
    DATA_SYSTEM_CHILDREN_LIST,
    DATA_SYSTEM_ID,
    DATA_SYSTEM_PARENT_LIST,
    DATA_SYSTEM_PROGRESS_TYPE,
} from '@entities/orbit/model/types';
import Orbit from '@entities/orbit/ui';

import { CircleModal } from '@shared/CircleModal';

import { bem } from '@shared/utils/bem';

import { SystemProgressTypes } from '@shared/types/common';

import './style.scss';

interface IGalaxyProps {
  galaxyPage: HTMLDivElement | null;
  userProgress: UserProgress;
  orbitList: Array<OrbitType>;
  svgContainerClass: string;
  width: number;
  height: number;
  systemWidth?: number;
  systemHeight?: number;
}

interface IOrbitSettings {
  width: number;
  systemWidth: number;
  backgroundWidth: number;
  height: number;
  systemHeight: number;
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
    const [activeSystems, setActiveSystems] = useState<Array<number>>([]);
    const [stars, setStars] = useState<NodeListOf<HTMLDivElement>>(
        document.querySelectorAll(`.${STAR_CLASS}`),
    );
    const [lastChosenStar, setLastChosenStar] = useState<SystemResponseInterface>({
        ...DEFAULT_CHOSEN_STAR,
        ...DEFAULT_SYSTEM_RESPONSE_MESSAGE,
    });
    const [windowSize, setWindowSize] = useState([0, 0]);

    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    //что бы последняя орбита с планетами не была 0x0, уменьшаем шаг между орбитами,
    //увеличив кол-во орбит в подсчетах на 1
    const orbitWidthStep = width / (orbitList.length + 1);
    const orbitHeightStep = height / (orbitList.length + 1);

    const orbitSettings: IOrbitSettings = {
        width,
        systemWidth: props.systemWidth || 80,
        backgroundWidth: width + orbitWidthStep / 2,
        height,
        systemHeight: props.systemWidth || 80,
        backgroundHeight: height + orbitHeightStep / 2,
    };

    useEffect(() => {
        //функции реагирования на обновление размеров окна приложения
        const updateSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

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
        //реагирование на изменение масштаба окна приложения
        handleSystemMouseLeave();
    }, [windowSize]);

    useEffect(() => {
        //поиск на странице и изменение модификаторов элементов в соответствии с состоянием
        setStars(
            document.querySelectorAll(`.${STAR_CLASS}`),
        );

        setStarsActivityToActive({
            activeSystemsId: activeSystems,
        });
    }, [activeSystems]);

    const handleSystemMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const targetId = currentTarget.getAttribute(DATA_SYSTEM_ID);
        const childrenList = currentTarget.getAttribute(DATA_SYSTEM_CHILDREN_LIST);
        const parentsList = currentTarget.getAttribute(DATA_SYSTEM_PARENT_LIST);
        const systemProgressType = currentTarget.getAttribute(DATA_SYSTEM_PROGRESS_TYPE);

        addActivePlanet({
            activeSystemId: targetId,
            setActiveSystems,
        });

        if (
            systemProgressType === SystemProgressTypes.SYSTEM_OPEN ||
            systemProgressType === SystemProgressTypes.SYSTEM_EDUCATION
        ) {
            showPlanetsChildren({
                childrenList,
                currentTarget,
                systemWidth: orbitSettings.systemWidth,
                systemHeight: orbitSettings.systemHeight,
                svgContainer,
                setActiveSystems,
            });
        }

        if (systemProgressType === SystemProgressTypes.SYSTEM_CLOSE) {
            showPlanetsParents({
                parentsList,
                currentTarget,
                systemWidth: orbitSettings.systemWidth,
                systemHeight: orbitSettings.systemHeight,
                svgContainer,
                setActiveSystems,
            });
        }
    };

    const handleSystemMouseLeave = () => {
        setActiveSystems([]);

        setStarsActivityToInactive({
            stars,
        });

        deleteAllConnectionLines({
            svgContainer,
        });
    };

    const handleSystemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = event.currentTarget;

        const targetId = Number(currentTarget.getAttribute(DATA_SYSTEM_ID));

        setLastChosenStar({
            ...DEFAULT_CHOSEN_STAR,
            ...DEFAULT_SYSTEM_RESPONSE_MESSAGE,
        });

        dispatch(showModal());

        fetchSystemById({
            id: targetId,
        }).then((response) => {
            setLastChosenStar(response);
        }).catch((reason) => {
            setLastChosenStar({
                ...DEFAULT_CHOSEN_STAR,
                ...DEFAULT_SYSTEM_RESPONSE_MESSAGE,
                systemName: 'Fetch error.',
            });
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
                    width: orbitSettings.width,
                    height: orbitSettings.height,
                }}
            />
            {orbitList.map((orbits) => {
                orbitSettings.width -= orbitWidthStep;
                orbitSettings.height -= orbitHeightStep;

                return (
                    <Orbit
                        key={orbits.orbitId}
                        userProgress={userProgress}
                        systemList={orbits.systemList}
                        orbitWidth={orbitSettings.width}
                        orbitHeight={orbitSettings.height}
                        systemStyle={{
                            width: orbitSettings.systemWidth + 'px',
                            height: orbitSettings.systemHeight + 'px',
                        }}
                        handleSystemClick={handleSystemClick}
                        handleSystemMouseEnter={handleSystemMouseEnter}
                        handleSystemMouseLeave={handleSystemMouseLeave}
                    />
                );
            })}
        </div>
    );
};

export default Galaxy;
