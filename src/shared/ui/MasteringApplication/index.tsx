import { useState } from 'react';
import { toast } from 'react-hot-toast';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';
import { closeCourseRequest } from '@entities/explorer/thunks/closeCourseRequest';

import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/bem';

import { CONFIRM_CANCEL_LEARNING } from '@shared/constants/modalTitles';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toastTitles';

import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';


export const MasteringApplication = () => {
    const [block, element] = bem('current-star-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        studyRequest,
    } = userInfo;

    if (!studyRequest) {
        return null;
    }

    return (
        <div className={block()}>
            {
                isAcceptModalOpen &&
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_LEARNING}
                    rejectButtonTitle='Нет, хочу продолжить'
                    submitButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                    onSubmit={() => {
                        dispatch(closeCourseRequest({
                            payload: {
                                requestId: studyRequest.requestId,
                            },
                        }));
                        toast(TOAST_SUCCESS_REJECTED, {
                            icon: '😔',
                        });
                        setIsAcceptModalOpen(false);
                    }}
                />
            }


            <Typography
                className={element('current-star-heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Заявка на освоение
            </Typography>
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('wrapper')}>
                    <div>
                        <Typography
                            variant={typographyVariant.h2}
                            className={element('heading')}
                        >
                            {`Планета: ${studyRequest.courseTitle}`}
                        </Typography>
                        <Typography
                            variant={typographyVariant.regular14}
                            className={element('current-galaxy')}
                        >
                            {`Звезда: ${studyRequest.galaxyName}`}
                        </Typography>
                        <Typography
                            variant={typographyVariant.regular14}
                            className={element('current-keeper', 'mb')}
                        >
                            {`Преподаватель: ${studyRequest.keeperLastName} ${studyRequest.keeperFirstName} ${studyRequest.keeperPatronymic}`}
                        </Typography>
                    </div>

                    <div>
                        <div className={element('buttons')}>
                            <Button
                                size={buttonSize.large}
                                title="Отменить заявку"
                                onClick={() => setIsAcceptModalOpen(true)}
                            />
                            <Button
                                size={buttonSize.large}
                                color={buttonColor.filled}
                                title="Продолжить"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
