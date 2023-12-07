import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { userIsModalOpenSelector } from '@entities/user/model/selectors';
import { closeModal, showModal } from '@entities/user/model/slice';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { CONFIRM_CANCEL_LEARNING } from '@shared/constants/modalTitles';

import { ProgressBar } from '@widgets/ProgressBar';
import { SelectSystem } from '@widgets/SelectSystem';

import { CurrentSystemCardInterface } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import CircleModalWithGalaxy from '@entities/galaxy/ui/CircleModalWithGalaxy';
import { useLeaveCourseByExplorerIdMutation } from '@entities/course';
import { useStatus } from '@shared/utils/hooks/use-status';
import toast from 'react-hot-toast';
import { TOAST_LEAVE_COURSE } from '@shared/constants/toastTitles';

export const CurrentSystemCard = (props: CurrentSystemCardInterface) => {
    const [block, element] = bem('current-system-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    const { data: userInfo, isSuccess: isSuccessExplorerProfile } =
        useGetExplorerProfileQuery();
    const [leaveCourseRequest, { isSuccess: isSuccessLeaveCourse }] =
        useLeaveCourseByExplorerIdMutation();

    const countEditingRequests = userInfo?.homeworkRequests
        ?.filter((request) =>
            request.status.status === 'EDITING')
        .length;

    useStatus(() => {
        toast(TOAST_LEAVE_COURSE, {
            icon: '😔',
        });
    }, isSuccessLeaveCourse);

    if (!userInfo?.currentSystem && !userInfo?.studyRequest)
        return <SelectSystem />;

    if (userInfo?.studyRequest || !isSuccessExplorerProfile) return null;

    const { currentSystem } = userInfo;

    const handleSubmitLeaveCourse = () => {
        leaveCourseRequest(currentSystem?.explorerId);
        setIsAcceptModalOpen(false);
    };

    return (
        <div className={block()}>
            <CircleModalWithGalaxy
                handleClose={() => dispatch(closeModal())}
                isOpen={isModalOpen}
                currentSystemId={currentSystem.courseId}
            />
            <ConfirmModal
                isOpen={isAcceptModalOpen}
                confirmTitle={CONFIRM_CANCEL_LEARNING}
                rejectButtonTitle='Нет, хочу продолжить'
                submitButtonTitle='Да, я уверен'
                onClose={() => setIsAcceptModalOpen(false)}
                onSubmit={handleSubmitLeaveCourse}
            />

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
                    {`Система: ${currentSystem?.courseTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-system')}
                >
                    {`Планета: ${currentSystem?.courseThemeTitle}`}
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

                {countEditingRequests !== 0 && (
                    <Typography
                        variant={typographyVariant.regular14}
                        color={typographyColor.white}
                        className={element('count-checked-requests')}
                    >
                        Количество проверенных запросов: {countEditingRequests}
                    </Typography>
                )}

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
                        onClick={() => dispatch(showModal())}
                    />
                </div>
            </Card>
        </div>
    );
};
