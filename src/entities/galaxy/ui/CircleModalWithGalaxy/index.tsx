import {
    useGetCourseInfoByCourseIdQuery,
    useGetExplorerProgressByExplorerIdQuery,
    useGetPlanetsBySystemIdQuery,
    useGetSystemsBySystemIdQuery,
    useGetUserProgressInGalaxyQuery,
} from '@entities/galaxy/api/api';
import { CircleModalWithGalaxyProps } from '@entities/galaxy/ui/CircleModalWithGalaxy/interface';
import { CurrentUserItem } from '@entities/user';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { TABS_LIST } from '@pages/Explorer/model';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { CircleModal } from '@shared/ui/CircleModal';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { FinalGrade } from '@shared/ui/FinalGrade';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { ModalAlert } from '@shared/ui/ModalAlert';
import { PlanetList } from '@shared/ui/PlanetList';
import { RequiredSystemsList } from '@shared/ui/RequiredSystemsList';
import { SelectUsersList } from '@shared/ui/SelectUsersList';
import { Typography } from '@shared/ui/Typography';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';
import { UsersList } from '@shared/ui/UsersList';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabPanel } from 'react-tabs';

export const CircleModalWithGalaxy = ({
    handleChangeSystem,
    handleClose,
    isOpen,
    progress,
    currentSystemId,
    galaxyId
}: CircleModalWithGalaxyProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const { role } = useAuth();
    const isExplorer = role === 'EXPLORER';

    const { data: planets } = useGetPlanetsBySystemIdQuery(
        Number(currentSystemId),
        { skip: !isOpen || !isExplorer },
    );

    const { data: courseInfo } = useGetCourseInfoByCourseIdQuery(
        Number(currentSystemId),
        { skip: !isOpen },
    );

    const { data: system } = useGetSystemsBySystemIdQuery(
        {
            withDependencies: true,
            systemId: Number(currentSystemId),
        },
        { skip: !isOpen },
    );

    const { data: explorerProgress } = useGetExplorerProgressByExplorerIdQuery(
        Number(courseInfo?.you?.explorerId),
        { skip: !courseInfo?.you || !isOpen },
    );

    const { data: userProgress } = useGetUserProgressInGalaxyQuery(
        Number(galaxyId),
        { skip: !isExplorer || !isOpen || !galaxyId },
    );

    const systemIsOpen = userProgress?.openedSystems.some(
        (systemId) => Number(currentSystemId) === systemId,
    );

    const explorers = courseInfo?.explorers;
    const keepers = courseInfo?.keepers;
    const yourKeeper = courseInfo?.yourKeeper;
    const currentPlanetId = explorerProgress?.planets.find(
        (planet) => !planet.completed,
    )?.courseThemeId;
    const dependencySystemListWithParent = system?.systemDependencyList.filter(
        (system) => system.type === 'parent',
    );

    return (
        <CircleModal
            isOpen={isOpen}
            header={courseInfo?.course?.title!}
            onClose={handleClose}
        >
            <div>
                {systemIsOpen && (
                    <Button
                        color={buttonColor.filled}
                        size={buttonSize.large}
                        title='Отправить заявку'
                        onClick={() => setActiveTab(2)}
                    />
                )}
            </div>
            {dependencySystemListWithParent?.length !== 0 && (
                <ModalAlert title={ModalAccessStatus.closed_needSystems}>
                    <RequiredSystemsList
                        systemList={dependencySystemListWithParent}
                        handleChangeSystem={handleChangeSystem}
                    />
                </ModalAlert>
            )}

            <MmtTabs
                list={TABS_LIST}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            >
                <TabPanel>
                    <PlanetList
                        planetList={planets}
                        currentPlanetId={currentPlanetId}
                    />
                    <FinalGrade />
                </TabPanel>
                <TabPanel>
                    {!!courseInfo?.you && (
                        <>
                            <CurrentUserItem
                                explorer={courseInfo.you}
                                badgeTitle='Мой рейтинг'
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                        </>
                    )}
                    {explorers?.length !== 0 ? (
                        <UsersList explorersList={explorers} />
                    ) : (
                        <>
                            <Typography
                                variant={typographyVariant.medium16}
                                color={typographyColor.black}
                            >
                                У данного курса нет исследователей
                            </Typography>
                        </>
                    )}
                </TabPanel>
                <TabPanel>
                    {!!yourKeeper && (
                        <>
                            <CurrentUserItem
                                keeper={yourKeeper}
                                badgeTitle='Мой хранитель'
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                        </>
                    )}
                    {!yourKeeper?.personId ? (
                        keepers?.length !== 0 ? (
                            <SelectUsersList
                                keepersList={keepers}
                                courseId={courseInfo?.course?.courseId}
                            />
                        ) : (
                            <Typography
                                variant={typographyVariant.medium16}
                                color={typographyColor.black}
                            >
                                У данного курса нет хранителей
                            </Typography>
                        )
                    ) : (
                        <UsersList keepersList={keepers} />
                    )}
                </TabPanel>
            </MmtTabs>
        </CircleModal>
    );
};
