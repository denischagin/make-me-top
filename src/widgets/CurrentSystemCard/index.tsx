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
import toast from 'react-hot-toast';
import { TOAST_LEAVE_COURSE } from '@shared/constants/toastTitles';
import { Badge } from '@shared/ui/Badge';
import { badgeColor } from '@shared/ui/Badge/interfaces';
import { Link } from 'react-router-dom';
import { getUrlKeeperById } from '@shared/constants/links';

export const CurrentSystemCard = (props: CurrentSystemCardInterface) => {
    const [block, element] = bem('current-system-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(userIsModalOpenSelector);

    const { data: userInfo, isSuccess: isSuccessExplorerProfile } =
        useGetExplorerProfileQuery();
    const [leaveCourseRequest] =
        useLeaveCourseByExplorerIdMutation();

    const countEditingRequests = userInfo?.homeworkRequests
        ?.filter((request) =>
            request.status.status === 'EDITING')
        .length;

    const handleSuccessLeaveCourse = () => {
        toast(TOAST_LEAVE_COURSE, {
            icon: '😔',
        });
    };

    if (!userInfo?.currentSystem && !userInfo?.studyRequest)
        return <SelectSystem />;

    if (userInfo?.studyRequest || !isSuccessExplorerProfile) return null;

    const { currentSystem } = userInfo;

    const handleSubmitLeaveCourse = () => {
        setIsAcceptModalOpen(false);

        leaveCourseRequest(currentSystem?.explorerId)
            .unwrap()
            .then(handleSuccessLeaveCourse)
            .catch(() => {
            });
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

                <Link
                    to={getUrlKeeperById(currentSystem?.keeper?.personId?.toString())}
                    className={element('current-keeper', 'mb-4')}
                >
                    <Typography
                        variant={typographyVariant.regular14}
                    >
                        {`Хранитель: ${getUserFullName(currentSystem?.keeper)}`}
                    </Typography>
                </Link>

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
                        Количество проверенных запросов:{' '}
                        <Badge
                            color={badgeColor.primary500}>{countEditingRequests}</Badge>
                    </Typography>
                )}
                {userInfo.currentSystem.unfulfilledHomeworksNumber !== 0 && (
                    <Typography
                        variant={typographyVariant.regular14}
                        color={typographyColor.white}
                        className={element('count-checked-requests')}
                    >
                        Количество невыполненных заданий:{' '}
                        <Badge
                            color={badgeColor.primary500}>{userInfo.currentSystem.unfulfilledHomeworksNumber}</Badge>
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
