import { useState } from 'react';
import toast from 'react-hot-toast';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { explorerCardInfoSelector } from '@entities/explorer/model/selectors';

import { acceptOrRejectCourseRequest } from '@entities/keeper/thunks/acceptOrRejectCourseRequest';

import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { ConfirmModal } from '@shared/ConfirmModal';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CONFIRM_CANCEL_TEACHING } from '@shared/constants/modalTitles';
import {
    TOAST_SUCCES_APPROVED,
    TOAST_SUCCES_REJECTED,
} from '@shared/constants/toastTitles';

import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ExplorerApplicationCard = () => {
    const [block, element] = bem('explorer-application-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        studyRequest,
        reviewRequest,
        currentSystem,
    } = userInfo;

    if (!currentSystem && !studyRequest) {
        return null;
    }

    const studyRequestOrcurrentSystem = currentSystem || studyRequest;

    return (
        <div className={block()}>
            {
                isAcceptModalOpen &&
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_TEACHING}
                    rejectButtonTitle='Нет, хочу продолжить'
                    submitButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                    onSubmit={() => {
                        dispatch(acceptOrRejectCourseRequest({
                            requestId: reviewRequest.requestId,
                            rejection: {
                                approved: false,
                            },
                        }));
                        toast(TOAST_SUCCES_REJECTED, {
                            icon: '😔',
                        });
                        setIsAcceptModalOpen(false);
                    }}
                />
            }
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                {currentSystem ? 'Текущая звезда:' : 'Заявка на обучение:'}
            </Typography>
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Typography
                            className={element('planet')}
                            variant={typographyVariant.h2}
                        >
                            {`Планета: ${studyRequestOrcurrentSystem?.courseId}. ${studyRequestOrcurrentSystem?.courseTitle}`}
                        </Typography>
                        <Typography
                            className={element('star')}
                            variant={typographyVariant.regular14}
                        >
                            {`Звезда: ${studyRequestOrcurrentSystem?.courseThemeTitle}`}
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
                        {
                            currentSystem ?
                                <Button
                                    title={'Посмотреть'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                /> :
                                <Button
                                    title={'Принять'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                    onClick={() => {
                                        dispatch(acceptOrRejectCourseRequest({
                                            requestId: studyRequest.requestId,
                                            rejection: {
                                                approved: true,
                                            },
                                        },
                                        ));
                                        toast(TOAST_SUCCES_APPROVED, {
                                            icon: '🤩',
                                        });
                                    }}
                                />
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};
