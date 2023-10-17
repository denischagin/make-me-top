import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch } from '@app/providers/store/hooks';

import { acceptOrRejectCourseRequest } from '@entities/keeper/thunks/acceptOrRejectCourseRequest';

import { bem } from '@shared/utils/helpers/bem';

import { CONFIRM_CANCEL_TEACHING } from '@shared/constants/modalTitles';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerCardInfoQuery } from '@entities/explorer/api/api';
import { useParams } from 'react-router-dom';
import {
    useAcceptCourseRequestMutation,
    useRejectCourseRequestMutation,
} from '@entities/keeper/api/api';
import { useStatus } from '@shared/utils/hooks/use-status';
import {
    TOAST_SUCCESS_APPROVED,
    TOAST_SUCCESS_REJECTED,
} from '@shared/constants/toasts';
import toast from 'react-hot-toast';

export const ExplorerApplicationCard = () => {
    const [block, element] = bem('explorer-application-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const { personId } = useParams();

    const { data: userInfo, isSuccess } = useGetExplorerCardInfoQuery(
        Number(personId),
    );
    const [acceptCourse, { isSuccess: isSuccessAccept }] =
        useAcceptCourseRequestMutation();
    const [rejectCourse] = useRejectCourseRequestMutation();

    if (!isSuccess) return null;

    const { studyRequest, currentSystem } = userInfo;

    if (!currentSystem && !studyRequest) {
        return null;
    }

    const studyRequestOrСurrentSystem = currentSystem || studyRequest;

    const handleAcceptCourse = () => {
        acceptCourse({
            requestId: studyRequest.requestId,
        });
    };

    const handleRejectCourse = () => {
        rejectCourse({
            requestId: studyRequest.requestId,
        });
        setIsAcceptModalOpen(false);
    };

    return (
        <div className={block()}>
            {isAcceptModalOpen && (
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_TEACHING}
                    rejectButtonTitle='Нет, хочу продолжить'
                    submitButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                    onSubmit={handleRejectCourse}
                />
            )}
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                {!!currentSystem ? 'Текущая система:' : 'Заявка на обучение:'}
            </Typography>
            <Card size={cardSize.large} glow>
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Typography
                            className={element('planet')}
                            variant={typographyVariant.h2}
                        >
                            Система: {studyRequestOrСurrentSystem?.courseId}.{' '}
                            {studyRequestOrСurrentSystem?.courseTitle}
                        </Typography>
                        <Typography
                            className={element('system')}
                            variant={typographyVariant.regular14}
                        >
                            {!!currentSystem
                                ? `Система: ${currentSystem.courseThemeTitle}`
                                : `Галактика: ${studyRequest?.galaxyName}`}
                        </Typography>
                    </div>
                    <div className={element('buttons')}>
                        <div className={element('hidden-button')}>
                            <Button
                                title={'Отклонить'}
                                size={buttonSize.large}
                                onClick={() => setIsAcceptModalOpen(true)}
                            />
                        </div>
                        {currentSystem ? (
                            <Button
                                title={'Посмотреть'}
                                color={buttonColor.filled}
                                size={buttonSize.large}
                            />
                        ) : (
                            <Button
                                title={'Принять'}
                                color={buttonColor.filled}
                                size={buttonSize.large}
                                onClick={handleAcceptCourse}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
