import './style.scss';
import {
    useGetExplorerProgressByExplorerIdQuery,
    useGetPlanetsBySystemIdQuery,
    useGetSystemsBySystemIdQuery,
} from '@entities/galaxy/api/api';
import { CircleModalWithGalaxyProps } from '@entities/galaxy/ui/CircleModalWithGalaxy/interface';
import { useAuth } from '@entities/viewer';
import { TABS_LIST } from '@pages/Explorer/model';
import { Button } from '@shared/ui/Button';
import {
    ButtonInterface,
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { CircleModal } from '@shared/ui/CircleModal';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { ModalAlert } from '@shared/ui/ModalAlert';
import { bem } from '@shared/utils/helpers/bem';
import { memo, useEffect, useMemo, useState } from 'react';
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
import { useModalAccessStatus } from '@entities/galaxy/lib/hooks/useModalAccessStatus';
import {
    CourseKeeper,
    useGetCourseInfoByCourseIdQuery,
    usePostCourseRequestMutation,
} from '@entities/course';

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

    const { data: courseInfo, isFetching: isFetchingCourseInfo } =
        useGetCourseInfoByCourseIdQuery(Number(currentSystemId), {
            skip: !isOpen,
        });

    const { data: system, isFetching: isFetchingSystem } =
        useGetSystemsBySystemIdQuery(
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

    const isFetching = isFetchingCourseInfo || isFetchingSystem;

    const [selectedKeepers, setSelectedKeepers] = useState<CourseKeeper[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setSelectedKeepers([]);
        setActiveTab(0);
    }, [currentSystemId]);

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

    const sendButtonProps: Pick<
        ButtonInterface,
        'color' | 'onClick' | 'title'
    > = {
        color:
            selectedKeepers.length === 0 && activeTab === 2
                ? buttonColor.primary500
                : buttonColor.filled,

        onClick:
            activeTab === 2 ? handleSendApplication : () => setActiveTab(2),
        title:
            selectedKeepers.length === 0 && activeTab === 2
                ? 'Выберите хранителей'
                : 'Отправить заявку',
    };

    return (
        <CircleModal
            isOpen={isOpen}
            header={!isFetching ? courseInfo?.course?.title! : 'Загрузка...'}
            onClose={handleClose}
        >
            <div className={block()}>
                {!isFetching && canYouSendCourseRequest && (
                    <Button
                        size={buttonSize.large}
                        className={element('send-button')}
                        {...sendButtonProps}
                    />
                )}
            </div>

            {!isFetching && (
                <ModalAlert
                    isExplorer={isExplorer}
                    title={modalAccessStatus}
                    dependencies={dependencySystemListWithParent}
                    handleChangeSystem={handleChangeSystem}
                />
            )}
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
