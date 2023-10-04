import {
    memo,
    useState,
} from 'react';
import { TabPanel } from 'react-tabs';
import { Button } from '@shared/ui/Button';
import { CircleModal } from '@shared/ui/CircleModal';
import { DividingLine } from '@shared/ui/DividingLine';
import { FinalGrade } from '@shared/ui/FinalGrade';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { PlanetList } from '@shared/ui/PlanetList';
import { SelectUsersList } from '@shared/ui/SelectUsersList';
import { Typography } from '@shared/ui/Typography';
import { UsersList } from '@shared/ui/UsersList';

import { CurrentUserItem } from '@entities/user';

import { bem } from '@shared/utils/helpers/bem';

import { TABS_LIST } from '@pages/Explorer/model';

import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import { GalaxyCircleModalProp } from './interface';

import './style.scss';

export const GalaxyCircleModal = ({
    lastChosenSystem,
    onClose,
    userProgress,
    you,
    keepers,
    course,
    yourKeeper,
    explorers,
    courseId,
    isOpen,
    handleChangeSystem,
}: GalaxyCircleModalProp) => {
    const [block, element] = bem('galaxy-circle-modal');
    const [activeTab, setActiveTab] = useState(0);

    const systemIsOpen = userProgress.openedSystems.some(
        (systemId) => systemId === lastChosenSystem.systemId,
    );

    return (
        <CircleModal
            isOpen={isOpen}
            header={lastChosenSystem.systemName}
            data={{
                lastChosenSystem,
                userProgress,
            }}
            isLocked={lastChosenSystem.isLocked}
            onClose={onClose}
            handleChangeSystem={handleChangeSystem}
        >
            <div className={element('send-button')}>
                {systemIsOpen && (
                    <Button
                        color={buttonColor.filled}
                        size={buttonSize.large}
                        title='Отправить заявку'
                        onClick={() => setActiveTab(2)}
                    />
                )}
            </div>
            {
                <MmtTabs
                    list={TABS_LIST}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                >
                    <TabPanel>
                        <PlanetList currentPlanet={course.title} />
                        <FinalGrade />
                    </TabPanel>
                    <TabPanel>
                        {!!you && (
                            <>
                                <CurrentUserItem
                                    explorer={you}
                                    badgeTitle='Мой рейтинг'
                                />
                                <DividingLine
                                    color={DividingLineColor.gray500}
                                />
                            </>
                        )}
                        {explorers?.length !== 0 ? (
                            <UsersList explorersList={explorers} />
                        ) : (
                            <div className={element('empty-text')}>
                                <Typography
                                    variant={typographyVariant.medium16}
                                    color={typographyColor.black}
                                >
                                    У данного курса нет исследователей
                                </Typography>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        {!!yourKeeper && (
                            <>
                                <CurrentUserItem
                                    keeper={yourKeeper}
                                    badgeTitle='Мой хранитель'
                                />
                                <DividingLine
                                    color={DividingLineColor.gray500}
                                />
                            </>
                        )}
                        {!yourKeeper?.personId ? (
                            keepers?.length !== 0 ? (
                                <SelectUsersList
                                    keepersList={keepers}
                                    courseId={courseId}
                                />
                            ) : (
                                <div className={element('empty-text')}>
                                    <Typography
                                        variant={typographyVariant.medium16}
                                        color={typographyColor.black}
                                    >
                                        У данного курса нет хранителей
                                    </Typography>
                                </div>
                            )
                        ) : (
                            <UsersList keepersList={keepers} />
                        )}
                    </TabPanel>
                </MmtTabs>
            }
        </CircleModal>
    );
};

export default memo(
    GalaxyCircleModal,
    (prev, next) =>
        prev.lastChosenSystem.systemId === next.lastChosenSystem.systemId &&
        prev.isOpen === next.isOpen,
);
