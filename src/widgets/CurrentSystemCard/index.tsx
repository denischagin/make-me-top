import { useState } from 'react';
import toast from 'react-hot-toast';
import { TabPanel } from 'react-tabs';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { CircleModal } from '@shared/ui/CircleModal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { DividingLine } from '@shared/ui/DividingLine';
import { FinalGrade } from '@shared/ui/FinalGrade';
import { MmtTabs } from '@shared/ui/MmtTabs';
import { PlanetList } from '@shared/ui/PlanetList';
import { Typography } from '@shared/ui/Typography';
import { UsersList } from '@shared/ui/UsersList';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { CurrentUserItem } from '@entities/user';

import {
    userCourseInfoSelector,
    userIsModalOpenSelector,
} from '@entities/user/model/selectors';
import { closeModal, showModal } from '@entities/user/model/slice';
import { getCourseInfo } from '@entities/user/thunks/getCourseInfo';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';

import { leaveCourseRequest } from '@entities/explorer/thunks/leaveCourseRequest';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { CONFIRM_CANCEL_LEARNING } from '@shared/constants/modalTitles';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toastTitles';

import { ProgressBar } from '@widgets/ProgressBar';
import { SelectSystem } from '@widgets/SelectSystem';

import { CurrentSystemCardInterface } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';

export const CurrentSystemCard = (props: CurrentSystemCardInterface) => {
    const { tabsList = [] } = props;

    const [block, element] = bem('current-system-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(userIsModalOpenSelector);
    const courseInfo = useAppSelector(userCourseInfoSelector);


    const { data: userInfo, isSuccess } = useGetExplorerProfileQuery();

    const { course, you, yourKeeper, explorers, keepers } = courseInfo;

    if (!userInfo?.currentSystem && !userInfo?.studyRequest) {
        return <SelectSystem />;
    }

    if (userInfo?.studyRequest || !isSuccess) {
        return null;
    }
    const { currentSystem,  } = userInfo;

    return (
        <div className={block()}>
            <CircleModal
                isOpen={isModalOpen}
                header={courseInfo.course.title}
                onClose={() => dispatch(closeModal())}
            >
                <MmtTabs
                    list={tabsList}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                >
                    <TabPanel>
                        <PlanetList currentPlanet={course.title} />
                        <FinalGrade />
                    </TabPanel>
                    <TabPanel>
                        <CurrentUserItem
                            explorer={you}
                            badgeTitle='Мой рейтинг'
                        />
                        <DividingLine color={DividingLineColor.gray500} />
                        <UsersList explorersList={explorers} />
                    </TabPanel>
                    <TabPanel>
                        <CurrentUserItem
                            keeper={yourKeeper}
                            badgeTitle='Мой хранитель'
                        />
                        <DividingLine color={DividingLineColor.gray500} />
                        <UsersList keepersList={keepers} />
                    </TabPanel>
                </MmtTabs>
            </CircleModal>
            {isAcceptModalOpen && (
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_LEARNING}
                    rejectButtonTitle='Нет, хочу продолжить'
                    submitButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                    onSubmit={() => {
                        dispatch(
                            leaveCourseRequest({
                                payload: {
                                    explorerId: currentSystem?.explorerId,
                                },
                                onSuccess: () => {
                                    toast(TOAST_SUCCESS_REJECTED, {
                                        icon: '😔',
                                    });
                                    setIsAcceptModalOpen(false);
                                },
                                onError: (err) => {
                                    toast(DEFAULT_ERROR_MESSAGE, {
                                        icon: '😔',
                                    });
                                },
                            }),
                        );
                    }}
                />
            )}
            <Typography
                className={element('current-system-heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Текущая система
            </Typography>
            <Card size={cardSize.large} glow>
                <Typography
                    variant={typographyVariant.h2}
                    className={element('heading')}
                >
                    {`Планета: ${currentSystem?.courseId}. ${currentSystem?.courseTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-system')}
                >
                    {`Система: ${currentSystem?.courseThemeTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-keeper', 'mb-4')}
                >
                    {`Хранитель: ${getUserFullName(currentSystem?.keeper)}`}
                </Typography>
                <span className={element('progress')}>
                    <Typography
                        variant={typographyVariant.medium16}
                        color={typographyColor.primary500}
                    >
                        {`Освоено ${currentSystem?.progress}%`}
                    </Typography>
                    <ProgressBar progress={currentSystem?.progress} />
                </span>
                <div className={element('buttons')}>
                    <Button
                        size={buttonSize.large}
                        title='Отменить'
                        onClick={() => setIsAcceptModalOpen(true)}
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.filled}
                        title='Продолжить'
                        onClick={() => {
                            dispatch(
                                getModalPlanets({
                                    planetId: currentSystem?.courseId,
                                }),
                            );
                            dispatch(
                                getCourseInfo({
                                    courseId: currentSystem?.courseId,
                                }),
                            );
                            dispatch(showModal());
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};
