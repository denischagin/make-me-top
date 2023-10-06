import React, {
    memo,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import {
    userCourseInfoSelector,
    userIsModalOpenSelector,
} from '@entities/user/model/selectors';
import {
    closeModal,
    toggleModal,
} from '@entities/user/model/slice';
import { getCourseInfo } from '@entities/user/thunks/getCourseInfo';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';

import { addActiveSystem } from '@entities/galaxy/lib/addActiveSystem';
import { deleteAllConnectionLines } from '@entities/galaxy/lib/deleteAllConnectionLines';
import { fetchAndSetLastChosenSystem } from '@entities/galaxy/lib/fetchAndSetLastChosenSystem';
import { isSystemLocked } from '@entities/galaxy/lib/isSystemLocked';
import { setSystemsActivityToActive } from '@entities/galaxy/lib/setSystemActivityToActive';
import { setSystemsActivityToInactive } from '@entities/galaxy/lib/setSystemActivityToInactive';
import { showSystemChildren } from '@entities/galaxy/lib/showSystemChildren';
import { showSystemParents } from '@entities/galaxy/lib/showSystemParents';
import {
    DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
    SYSTEM_CLASS,
} from '@entities/galaxy/model/constants';
import {
    IGalaxyProps,
    IOrbitSettings,
    LastChosenSystem,
} from '@entities/galaxy/model/types';

import {
    DATA_SYSTEM_CHILDREN_LIST,
    DATA_SYSTEM_ID,
    DATA_SYSTEM_PARENT_LIST,
    DATA_SYSTEM_PROGRESS_TYPE,
} from '@entities/orbit/model/types';
import Orbit from '@entities/orbit/ui';

import { bem } from '@shared/utils/helpers/bem';

import { SystemProgressTypes } from '@shared/types/common';

import { useLinesSvgContainer } from '../lib/hooks';

import { GalaxyCircleModal } from './GalaxyCircleModal';

import './style.scss';

const Galaxy: React.FC<IGalaxyProps> = (props) => {
    const {
        svgContainerClass,
        galaxyPage,
        userProgress,
        orbitList,
        width: fullWidth,
        height,
        systemWidth,
    } = props;

    const width = fullWidth > 1920 ? 1920 : fullWidth;

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

    const [systems, setSystems] = useState<NodeListOf<HTMLDivElement>>(
        document.querySelectorAll(`.${SYSTEM_CLASS}`),
    );
    const [activeSystemsIds, setActiveSystemsIds] = useState<Array<number>>([]);
    const [lastChosenSystem, setLastChosenSystem] = useState<LastChosenSystem>({
        ...DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
    });

    //что бы последняя орбита с планетами не была 0x0, уменьшаем шаг между орбитами,
    //увеличив кол-во орбит в подсчетах на 1
    const orbitWidthStep = width / (orbitList.length + 1);
    const orbitHeightStep = height / (orbitList.length + 1);

    const getAdaptiveSystemWidth = (
        windowWidth: number,
        systemWidth: number | undefined,
    ) => {
        if (windowWidth < 500) return 40;
        else if (windowWidth < 800) return 50;
        else if (windowWidth < 1200) return 60;

        return systemWidth ?? 80;
    };

    const adaptiveSystemWidth = useMemo(
        () => getAdaptiveSystemWidth(width, systemWidth),
        [width, systemWidth],
    );

    const orbitSettings: IOrbitSettings = useMemo(
        () => ({
            width,
            height,
            systemWidth: adaptiveSystemWidth,
            backgroundWidth: width + orbitWidthStep / 2,
            systemHeight: adaptiveSystemWidth,
            backgroundHeight: height + orbitHeightStep / 2,
        }),
        [
            width,
            height,
            getAdaptiveSystemWidth,
            orbitWidthStep,
            orbitHeightStep,
        ],
    );

    const svgContainer = useLinesSvgContainer(galaxyPage, svgContainerClass);

    useEffect(() => handleSystemMouseLeave(), [fullWidth]);

    useEffect(() => {
        //поиск на странице и изменение модификаторов элементов в соответствии с состоянием
        setSystems(document.querySelectorAll(`.${SYSTEM_CLASS}`));

        setSystemsActivityToActive({
            activeSystemsId: activeSystemsIds,
        });
    }, [activeSystemsIds]);

    useEffect(() => {
        setLastChosenSystem({
            ...lastChosenSystem,
            isLocked: isSystemLocked(userProgress, lastChosenSystem),
        });
    }, [lastChosenSystem.systemId]);

    const handleSystemMouseLeave = useCallback(() => {
        setActiveSystemsIds([]);

        setSystemsActivityToInactive({
            stars: systems,
        });

        deleteAllConnectionLines({
            svgContainer,
        });
    }, [systems.length, svgContainer]);

    const handleSystemMouseEnter = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            const currentTarget = event.currentTarget;

            const targetId = currentTarget.getAttribute(DATA_SYSTEM_ID);
            const childrenList = currentTarget.getAttribute(
                DATA_SYSTEM_CHILDREN_LIST,
            );
            const parentsList = currentTarget.getAttribute(
                DATA_SYSTEM_PARENT_LIST,
            );
            const systemProgressType = currentTarget.getAttribute(
                DATA_SYSTEM_PROGRESS_TYPE,
            );

            addActiveSystem({
                activeSystemId: targetId,
                setActiveSystemsIds,
            });

            if (
                systemProgressType === SystemProgressTypes.SYSTEM_OPEN ||
                systemProgressType === SystemProgressTypes.SYSTEM_EDUCATION
            ) {
                showSystemChildren({
                    childrenList,
                    currentTarget,
                    systemWidth: orbitSettings.systemWidth,
                    systemHeight: orbitSettings.systemHeight,
                    svgContainer,
                    setActiveSystemsIds,
                });
            }

            if (systemProgressType === SystemProgressTypes.SYSTEM_CLOSE) {
                showSystemParents({
                    parentsList,
                    currentTarget,
                    systemWidth: orbitSettings.systemWidth,
                    systemHeight: orbitSettings.systemHeight,
                    svgContainer,
                    setActiveSystemsIds,
                });
            }
        },
        [orbitSettings.systemWidth, orbitSettings.systemHeight, svgContainer],
    );

    const handleSystemClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const currentTarget = event.currentTarget;

            const targetId = Number(currentTarget.getAttribute(DATA_SYSTEM_ID));

            setLastChosenSystem({
                ...DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
            });

            dispatch(toggleModal());
            dispatch(
                getModalPlanets({
                    planetId: targetId,
                }),
            );
            dispatch(
                getCourseInfo({
                    courseId: targetId,
                }),
            );

            dispatch(
                fetchAndSetLastChosenSystem({
                    id: targetId,
                    withDependencies: true,
                    setLastChosenSystem,
                }),
            );
        },
        [],
    );

    const handleChangeSystem = (systemId: number) => {
        setLastChosenSystem({
            ...DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
        });

        dispatch(
            getModalPlanets({
                planetId: systemId,
            }),
        );
        dispatch(
            getCourseInfo({
                courseId: systemId,
            }),
        );

        dispatch(
            fetchAndSetLastChosenSystem({
                id: systemId,
                withDependencies: true,
                setLastChosenSystem,
            }),
        );
    };

    const handleCloseModal = useCallback(
        () => dispatch(closeModal()),
        [isModalOpen],
    );

    const courseId = lastChosenSystem.systemId;

    return (
        <div
            className={block()}
            style={{
                width,
                height,
            }}
        >
            <GalaxyCircleModal
                isOpen={isModalOpen}
                courseId={courseId}
                explorers={explorers}
                keepers={keepers}
                lastChosenSystem={lastChosenSystem}
                onClose={() => dispatch(closeModal())}
                userProgress={userProgress}
                you={you}
                yourKeeper={yourKeeper}
                handleChangeSystem={handleChangeSystem}
            />
            <div
                className={element('background')}
                style={{
                    width: orbitSettings.width,
                    height: orbitSettings.height,
                }}
            />
            {orbitList.map((orbit) => {
                orbitSettings.width -= orbitWidthStep;
                orbitSettings.height -= orbitHeightStep;

                return (
                    <Orbit
                        key={orbit.orbitId}
                        userProgress={userProgress}
                        systemList={orbit.systemList}
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

export default memo(Galaxy);
