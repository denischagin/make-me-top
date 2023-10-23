import { usePostCourseRequestMutation } from '@entities/explorer/api/api';
import './style.scss';
import {
    useGetCourseInfoByCourseIdQuery,
    useGetExplorerProgressByExplorerIdQuery,
    useGetPlanetsBySystemIdQuery,
    useGetSystemsBySystemIdQuery,
} from '@entities/galaxy/api/api';
import { CircleModalWithGalaxyProps } from '@entities/galaxy/ui/CircleModalWithGalaxy/interface';
import { CourseKeeper } from '@entities/user/model/types';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { TABS_LIST } from '@pages/Explorer/model';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { CircleModal } from '@shared/ui/CircleModal';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { ModalAlert } from '@shared/ui/ModalAlert';
import { RequiredSystemsList } from '@shared/ui/RequiredSystemsList';
import { bem } from '@shared/utils/helpers/bem';
import { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabPanel } from 'react-tabs';
import { useAppDispatch } from '@app/providers/store/hooks';
import { useStatus } from '@shared/utils/hooks/use-status';
import { toggleModal } from '@entities/user/model/slice';
import { URL_PROFILE } from '@shared/constants/links';
import toast from 'react-hot-toast';
import { TOAST_ERROR_CHOOSE_KEEPER } from '@shared/constants/toastTitles';
import { PlanetListTab } from '@entities/galaxy/ui/PlanetListTab';
import { ExplorersListTab } from '@entities/galaxy/ui/ExplorersListTab';
import { KeepersListTab } from '@entities/galaxy/ui/KeepersListTab';
import { getModalStatus } from '@shared/utils/helpers/getModalStatus';
import { useModalAccessStatus } from '@entities/galaxy/lib/hooks/useModalAccessStatus';

const CircleModalWithGalaxy = ({
    handleChangeSystem,
    handleClose,
    isOpen,
    currentSystemId,
    userProgress,
}: CircleModalWithGalaxyProps) => {
    //TODO сделать запрет отправлять заявку, когда уже отправлена заявка
    const [block, element] = bem('circle-modal-galaxy');
    const { role } = useAuth();
    const isExplorer = role === 'EXPLORER';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Запросы
    const [postCourseRequest, { isSuccess }] = usePostCourseRequestMutation();

    const { data: planets } = useGetPlanetsBySystemIdQuery(
        Number(currentSystemId),
        {
            skip: !isOpen,
        },
    );

    const { data: courseInfo } = useGetCourseInfoByCourseIdQuery(
        Number(currentSystemId),
        {
            skip: !isOpen,
        },
    );

    const { data: system } = useGetSystemsBySystemIdQuery(
        {
            withDependencies: true,
            systemId: Number(currentSystemId),
        },
        { skip: !isOpen || !isExplorer },
    );

    const { data: explorerProgress } = useGetExplorerProgressByExplorerIdQuery(
        Number(courseInfo?.you?.explorerId),
        { skip: !courseInfo?.you || !isOpen },
    );

    const [selectedKeepers, setSelectedKeepers] = useState<CourseKeeper[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    // Переменные
    const {
        modalAccessStatus,
        canYouSendCourseRequest,
        dependencySystemListWithParent,
    } = useModalAccessStatus({
        courseInfo,
        currentSystemId,
        isExplorer,
        system,
        userProgress,
    });

    const currentPlanetId = useMemo(
        () =>
            explorerProgress?.planets.find((planet) => !planet.completed)
                ?.courseThemeId,
        [explorerProgress?.planets],
    );

    useStatus(() => {
        dispatch(toggleModal());
        navigate(URL_PROFILE);
    }, isSuccess);

    const handleSendApplication = () => {
        if (selectedKeepers.length === 0)
            return toast.error(TOAST_ERROR_CHOOSE_KEEPER);

        const keeperIds = selectedKeepers.map((user) => user.keeperId);

        postCourseRequest({
            courseId: courseInfo?.course?.courseId as number,
            keeperIds: keeperIds,
        });
    };

    return (
        <CircleModal
            isOpen={isOpen}
            header={courseInfo?.course?.title!}
            onClose={handleClose}
        >
            <div className={block()}>
                {canYouSendCourseRequest && (
                    <Button
                        color={
                            selectedKeepers.length === 0 && activeTab === 2
                                ? buttonColor.primary500
                                : buttonColor.filled
                        }
                        size={buttonSize.large}
                        title={
                            selectedKeepers.length === 0 && activeTab === 2
                                ? 'Выберите хранителей'
                                : 'Отправить заявку'
                        }
                        className={element('send-button')}
                        onClick={
                            activeTab === 2
                                ? handleSendApplication
                                : () => setActiveTab(2)
                        }
                    />
                )}
            </div>

            <ModalAlert
                isExplorer={isExplorer}
                title={modalAccessStatus}
                dependencies={dependencySystemListWithParent}
                handleChangeSystem={handleChangeSystem}
            />
            <MmtTabs
                list={TABS_LIST}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            >
                <TabPanel>
                    <PlanetListTab
                        planets={planets}
                        currentPlanetId={currentPlanetId}
                    />
                </TabPanel>

                <TabPanel>
                    <ExplorersListTab courseInfo={courseInfo} />
                </TabPanel>

                <TabPanel>
                    <KeepersListTab
                        courseInfo={courseInfo}
                        canYouSendCourseRequest={canYouSendCourseRequest}
                        selectedKeepers={selectedKeepers}
                        setSelectedKeepers={setSelectedKeepers}
                    />
                </TabPanel>
            </MmtTabs>
        </CircleModal>
    );
};

export default memo(CircleModalWithGalaxy);