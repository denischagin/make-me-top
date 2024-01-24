import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { CONFIRM_CANCEL_LEARNING } from '@shared/constants/modalTitles';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toastTitles';

import { buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { useCloseCourseRequestMutation } from '@entities/course';

export const MasteringApplication = () => {
    const [block, element] = bem('current-request-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const [closeCourseRequest] = useCloseCourseRequestMutation();
    const { data: userInfo, isSuccess } = useGetExplorerProfileQuery();

    const handleOnSuccessRejectCourseRequest = () => {
        toast(TOAST_SUCCESS_REJECTED, {
            icon: '😔',
        });
        setIsAcceptModalOpen(false);
    };

    if (!isSuccess || !userInfo.studyRequest) return null;

    const { studyRequest } = userInfo;

    const handleSubmitCloseCourseRequest = () => {
        closeCourseRequest(studyRequest.requestId)
            .unwrap()
            .then(handleOnSuccessRejectCourseRequest)
            .catch(function() {
            });
    };

    return (
        <div className={block()}>
            <ConfirmModal
                isOpen={isAcceptModalOpen}
                confirmTitle={CONFIRM_CANCEL_LEARNING}
                rejectButtonTitle='Нет, хочу продолжить'
                submitButtonTitle='Да, я уверен'
                onClose={() => setIsAcceptModalOpen(false)}
                onSubmit={handleSubmitCloseCourseRequest}
            />

            <Typography
                as="h2"
                className={element('current-star-heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Заявка на освоение
            </Typography>
            <Card size={cardSize.large} glow>
                <div className={element('wrapper')}>
                    <div>
                        <Typography
                            variant={typographyVariant.h2}
                            className={element('heading')}
                        >
                            {`Система: ${studyRequest.courseTitle}`}
                        </Typography>
                        <Typography
                            variant={typographyVariant.regular14}
                            className={element('current-galaxy')}
                        >
                            {`Галактика: ${studyRequest.galaxyName}`}
                        </Typography>
                        <Typography
                            variant={typographyVariant.regular14}
                            className={element('current-keeper', 'mb')}
                        >
                            Хранители:{' '}
                            {studyRequest.keepers
                                .map((keeper) => getUserFullName(keeper))
                                .join(', ')}
                        </Typography>
                    </div>

                    <div>
                        <div className={element('buttons')}>
                            <Button
                                size={buttonSize.large}
                                title='Отменить заявку'
                                onClick={() => setIsAcceptModalOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
