import './style.scss';
import { CircleModalWithGalaxyProps } from '@entities/galaxy/ui/CircleModalWithGalaxy/interface';
import { useAuth } from '@entities/viewer';
import { TABS_LIST } from '@pages/Explorer/model';
import { CircleModal } from '@shared/ui/CircleModal';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { ModalAlert } from '@shared/ui/ModalAlert';
import { bem } from '@shared/utils/helpers/bem';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabPanel } from 'react-tabs';
import { useAppDispatch } from '@app/providers/store/hooks';
import { toggleModal } from '@entities/user/model/slice';
import { getUrlThemeByCourseId, URL_PROFILE } from '@shared/constants/links';
import toast from 'react-hot-toast';
import { TOAST_ERROR_CHOOSE_KEEPER } from '@shared/constants/toastTitles';
import { PlanetListTab } from '@entities/galaxy/ui/PlanetListTab';
import { ExplorersListTab } from '@entities/galaxy/ui/ExplorersListTab';
import { KeepersListTab } from '@entities/galaxy/ui/KeepersListTab';
import { useModalAccessStatus } from '@entities/galaxy/libs/hooks/useModalAccessStatus';
import { CourseKeeper, usePostCourseRequestMutation } from '@entities/course';
import { useGetGalaxyCircleModalInfo } from '@entities/galaxy/libs/hooks/useGetGalaxyCircleModalInfo';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';
import { SendCourseRequestButton } from '@features/send-course-request/ui/SendCourseRequestButton';

const CircleModalWithGalaxy =
    ({
         handleChangeSystem,
         handleClose,
         isOpen,
         currentSystemId,
         userProgress,
         fromGalaxy = false,
     }: CircleModalWithGalaxyProps) => {
        const [block, element] = bem('circle-modal-galaxy');
        const { role } = useAuth();
        const isExplorer = role === 'EXPLORER';

        const navigate = useNavigate();
        const dispatch = useAppDispatch();

        const [postCourseRequest, { isSuccess: isSuccessCourseRequest }] =
            usePostCourseRequestMutation();
        const {
            courseInfo,
            explorerProgress,
            isCurrentRequestExists,
            isFetching,
            planets,
            system,
        } = useGetGalaxyCircleModalInfo({ currentSystemId, isOpen });

        const [selectedKeepers, setSelectedKeepers] = useState<CourseKeeper[]>([]);
        const [activeTab, setActiveTab] = useState(0);

        useEffect(() => {
            setSelectedKeepers([]);
            setActiveTab(0);
        }, [currentSystemId]);

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
            isCurrentRequestExists,
            fromGalaxy,
        });

        const currentPlanetId = useMemo(
            () =>
                explorerProgress?.planets.find((planet) => !planet.completed)
                    ?.courseThemeId,
            [explorerProgress?.planets],
        );

        const handleSuccessCourseRequest = () => {
            dispatch(toggleModal());
            navigate(URL_PROFILE);
        };

        const handleSendApplication = () => {
            if (selectedKeepers.length === 0)
                return toast.error(TOAST_ERROR_CHOOSE_KEEPER);

            const keeperIds = selectedKeepers.map((user) => user.keeperId);

            postCourseRequest({
                courseId: courseInfo?.course?.courseId as number,
                keeperIds: keeperIds,
            })
                .unwrap()
                .then(handleSuccessCourseRequest)
                .catch(() => {
                });
        };

        return (
            <CircleModal
                isOpen={isOpen}
                header={!isFetching ? courseInfo?.course?.title! : 'Загрузка...'}
                onClose={handleClose}
            >
                <div className={block()}>
                    {!isFetching && canYouSendCourseRequest && (
                        <SendCourseRequestButton
                            activeTabIndex={activeTab}
                            handleSendApplication={handleSendApplication}
                            keepersListIsEmpty={selectedKeepers.length === 0}
                            setActiveTab={setActiveTab}
                            className={element('send-button')}
                        />
                    )}
                </div>

                {!isFetching && (
                    <ModalAlert
                        isExplorer={isExplorer}
                        title={modalAccessStatus}
                        dependencies={dependencySystemListWithParent}
                        handleChangeSystem={handleChangeSystem}
                        onClickShow={() => navigate(getUrlThemeByCourseId({ courseId: currentSystemId! }))}
                        fromGalaxy={fromGalaxy}
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
                            currentCourseId={currentSystemId!}
                            allPlanetsLocked={fromGalaxy ? modalAccessStatus !== ModalAccessStatus.opened && modalAccessStatus !== ModalAccessStatus.studied_systemAlreadyDone || canYouSendCourseRequest : false}
                            currentGrade={courseInfo?.mark}
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
