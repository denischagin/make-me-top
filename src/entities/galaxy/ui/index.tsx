import React, {
    memo,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { userIsModalOpenSelector } from '@entities/user/model/selectors';
import { closeModal, toggleModal } from '@entities/user/model/slice';

import { deleteAllConnectionLines } from '@entities/galaxy/libs/helpers/deleteAllConnectionLines';
import { setSystemsActivityToActive } from '@entities/galaxy/libs/helpers/setSystemActivityToActive';
import { showSystemChildren } from '@entities/galaxy/libs/helpers/showSystemChildren';
import { showSystemParents } from '@entities/galaxy/libs/helpers/showSystemParents';
import {
    SYSTEM_CLASS,
} from '@entities/galaxy/model/constants';
import {
    IGalaxyProps,
    IOrbitSettings,
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

import { useLinesSvgContainer } from '../libs/hooks/useLinesSvgContainer';

import './style.scss';
import { useParams } from 'react-router-dom';
import CircleModalWithGalaxy from '@entities/galaxy/ui/CircleModalWithGalaxy';
import { useGalaxy } from '@entities/galaxy/libs/hooks/useGalaxy';

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
    const { galaxyId } = useParams();

    const width = fullWidth > 1920 ? 1920 : fullWidth;

    const [block, element] = bem('galaxy');

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    const [systems, setSystems] = useState<NodeListOf<HTMLDivElement>>(
        document.querySelectorAll(`.${SYSTEM_CLASS}`),
    );
    // const [activeSystemsIds, setActiveSystemsIds] = useState<Array<number>>([]);
    const { activeSystemsIds, setActiveSystemsIds } = useGalaxy();
    const [lastChosenSystemId, setLastChosenSystemId] = useState<
        number | null
    >();
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

    useEffect(() => {
        handleSystemMouseLeave();
    }, [fullWidth]);

    useEffect(() => {
        setSystemsActivityToActive({
            activeSystemsId: activeSystemsIds,
        });
    }, [activeSystemsIds]);

    const handleSystemMouseLeave = useCallback(() => {
        setActiveSystemsIds([]);

        deleteAllConnectionLines({
            svgContainer,
        });
    }, [systems.length, svgContainer]);

    const handleSystemMouseEnter = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            const currentTarget = event.currentTarget;

            const childrenList = currentTarget.getAttribute(
                DATA_SYSTEM_CHILDREN_LIST,
            );
            const parentsList = currentTarget.getAttribute(
                DATA_SYSTEM_PARENT_LIST,
            );
            const systemProgressType = currentTarget.getAttribute(
                DATA_SYSTEM_PROGRESS_TYPE,
            );

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

            setLastChosenSystemId(targetId);

            dispatch(toggleModal());
        },
        [],
    );

    const handleChangeSystem = (systemId: number) => {
        setLastChosenSystemId(systemId);
    };

    const handleCloseModal = useCallback(
        () => dispatch(closeModal()),
        [isModalOpen],
    );

    return (
        <div
            className={block()}
            style={{
                width,
                height,
            }}
        >
            <CircleModalWithGalaxy
                isOpen={isModalOpen}
                handleClose={handleCloseModal}
                currentSystemId={lastChosenSystemId}
                handleChangeSystem={handleChangeSystem}
                galaxyId={Number(galaxyId)}
                userProgress={userProgress}
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
