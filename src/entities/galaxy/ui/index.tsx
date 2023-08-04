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

import {
    userCourseInfoSelector,
    userIsModalOpenSelector,
} from '@entities/user/model/selectors';
import { showModal } from '@entities/user/model/slice';
import { getCourseInfo } from '@entities/user/thunks/getCourseInfo';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';

import { addActivePlanet } from '@entities/galaxy/lib/addActivePlanet';
import { createSvgContainer } from '@entities/galaxy/lib/createSvgContainer';
import { deleteAllConnectionLines } from '@entities/galaxy/lib/deleteAllConnectionLines';
import { isStarLocked } from '@entities/galaxy/lib/isStarLocked';
import { setStarsActivityToActive } from '@entities/galaxy/lib/setStarsActivityToActive';
import { setStarsActivityToInactive } from '@entities/galaxy/lib/setStarsActivityToInactive';
import { showPlanetsChildren } from '@entities/galaxy/lib/showPlanetsChildren';
import { showPlanetsParents } from '@entities/galaxy/lib/showPlanetsParents';
import {
    DEFAULT_CHOSEN_STAR,
    STAR_CLASS,
} from '@entities/galaxy/model/constants';
import {
    IGalaxyProps,
    ILastChosenStar,
    IOrbitSettings,
} from '@entities/galaxy/model/types';

import {
    DATA_SYSTEM_CHILDREN_LIST,
    DATA_SYSTEM_ID,
    DATA_SYSTEM_PARENT_LIST,
    DATA_SYSTEM_PROGRESS_TYPE,
} from '@entities/orbit/model/types';
import {
    fetchSystemById,
} from '@entities/orbit/thunks/fetchSystemById';
import Orbit from '@entities/orbit/ui';

import { CircleModal } from '@shared/CircleModal';
import { CurrentUserItem } from '@shared/CurrentUserItem';
import { DividingLine } from '@shared/DividingLine';
import { FinalGrade } from '@shared/FinalGrade';
import { MmtTabs } from '@shared/MmtTabs';
import { PlanetList } from '@shared/PlanetList';
import { SelectUsersList } from '@shared/SelectUsersList';
import { UsersList } from '@shared/UsersList';

import { bem } from '@shared/utils/bem';

import { TABS_LIST } from '@pages/Explorer/model';

import { DividingLineColor } from '@shared/DividingLine/interfaces';

import { SystemProgressTypes } from '@shared/types/common';

import './style.scss';

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
    const courseInfo = useAppSelector(userCourseInfoSelector);
    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    const {
        course,
        you,
        yourKeeper,
        explorers,
        keepers,
    } = courseInfo;

    const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null);
    const [activeSystems, setActiveSystems] = useState<Array<number>>([]);
    const [stars, setStars] = useState<NodeListOf<HTMLDivElement>>(
        document.querySelectorAll(`.${STAR_CLASS}`),
    );
    const [lastChosenStar, setLastChosenStar] = useState<ILastChosenStar>({
        ...DEFAULT_CHOSEN_STAR,
    });
    const [windowSize, setWindowSize] = useState([0, 0]);

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

    useEffect(() => {
        setLastChosenStar({ //todo путаница понятий, переименовать в lastChosenSystem
            ...lastChosenStar,
            isLocked: isStarLocked(userProgress, lastChosenStar),
        });

    }, [lastChosenStar.systemId]);

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
        });

        dispatch(showModal());
        dispatch(getModalPlanets({
            planetId: targetId,
        }));
        dispatch(getCourseInfo({
            courseId: targetId,
        }));

        fetchSystemById({
            id: targetId,
            withDependencies: true,
        }).then((response) => {
            setLastChosenStar({
                ...DEFAULT_CHOSEN_STAR,
                ...response,
            });
        }).catch((reason) => {
            setLastChosenStar({
                ...DEFAULT_CHOSEN_STAR,
                systemName: `Fetch error. ${reason}`,
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
                data={{
                    lastChosenStar,
                    userProgress,
                }}
                isLocked={lastChosenStar.isLocked}
                onClose={() => {
                    dispatch(showModal());
                    setLastChosenStar(DEFAULT_CHOSEN_STAR);
                }}
            >
                {<MmtTabs list={TABS_LIST}>
                    <TabPanel>
                        <PlanetList currentPlanet={course.title} />
                        <FinalGrade />
                    </TabPanel>
                    <TabPanel>
                        {
                            !!you &&
                            <>
                                <CurrentUserItem
                                    explorer={you}
                                    badgeTitle="Мой рейтинг"
                                />
                                <DividingLine color={DividingLineColor.gray500} />
                            </>
                        }
                        <UsersList explorersList={explorers} />
                    </TabPanel>
                    <TabPanel>
                        {
                            !!yourKeeper &&
                            <>
                                <CurrentUserItem
                                    keeper={yourKeeper}
                                    badgeTitle="Мой хранитель"
                                />
                                <DividingLine color={DividingLineColor.gray500} />
                            </>
                        }
                        {
                            (
                                yourKeeper &&
                                !yourKeeper.personId //initialState id = 0
                            ) ?
                                <SelectUsersList
                                    keepersList={keepers}
                                    courseId={lastChosenStar.systemId}
                                /> :
                                <UsersList
                                    keepersList={keepers}
                                />
                        }
                    </TabPanel>
                </MmtTabs>}
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
