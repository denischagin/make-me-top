import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { CONFIRM_CANCEL_REVIEW } from '@shared/constants/modalTitles';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerCardInfoQuery } from '@entities/explorer/api/api';
import { useParams } from 'react-router-dom';

export const ReviewRequestCard = () => {
    const [block, element] = bem('review-request-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const { personId } = useParams();

    const { data: userInfo, isSuccess } = useGetExplorerCardInfoQuery(
        Number(personId),
    );

    if (!isSuccess || !userInfo?.reviewRequest) return null;

    const { reviewRequest } = userInfo;

    return (
        <div className={block()}>
            <ConfirmModal
                isOpen={isAcceptModalOpen}
                confitmTitle={CONFIRM_CANCEL_REVIEW}
                rejectButtonTitle='Нет, хочу продолжить'
                submitButtonTitle='Да, я уверен'
                onClose={() => setIsAcceptModalOpen(false)}
                onSubmit={() => setIsAcceptModalOpen(false)} // в будущем будет метод отмены оценивания
            />

            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Запрос на проверку:
            </Typography>
            <Card size={cardSize.large} glow>
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Typography
                            className={element('planet')}
                            variant={typographyVariant.h2}
                        >
                            {`Планета: ${reviewRequest?.courseId}. ${reviewRequest?.courseTitle}`}
                        </Typography>
                        <Typography
                            className={element('system')}
                            variant={typographyVariant.regular14}
                        >
                            {`Система: ${reviewRequest?.courseThemeTitle}`}
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
                        <Button
                            title={'Оценить'}
                            color={buttonColor.filled}
                            size={buttonSize.large}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};
