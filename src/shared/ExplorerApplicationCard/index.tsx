import { useState } from 'react';

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
        currentSystem,
    } = userInfo;

    const studyRequestOrСurrentSystem = currentSystem || studyRequest;

    if (!currentSystem && !studyRequest) {
        return null;
    }

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
                            requestId: studyRequest.requestId,
                            rejection: {
                                approved: false,
                            },
                        }));
                        setIsAcceptModalOpen(false);
                    }}
                />
            }
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                {currentSystem ? 'Текущая система:' : 'Заявка на обучение:'}
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
                            {`Система: ${studyRequestOrСurrentSystem?.courseId}. ${studyRequestOrСurrentSystem?.courseTitle}`}
                        </Typography>
                        <Typography
                            className={element('system')}
                            variant={typographyVariant.regular14}
                        >
                            {
                                currentSystem
                                    ? `Система: ${currentSystem?.courseThemeTitle}`
                                    : `Галактика: ${studyRequest?.galaxyName}`
                            }
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
                                        }));
                                    }}
                                />
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};
