import { useState } from 'react';

import { useAppSelector } from '@app/providers/store/hooks';

import {
    explorerApplicationCardSelector,
    explorerCardInfoSelector,
} from '@entities/explorer/model/selectors';

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

    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        currentSystem,
    } = userInfo;

    if (!currentSystem) {
        return null;
    }

    return (
        <div className={block()}>
            {
                isAcceptModalOpen &&
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_TEACHING}
                    confirmButtonTitle='Нет, хочу продолжить'
                    declineButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                />
            }
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Текущая звезда:
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
                            {`Планета: ${currentSystem?.courseId}. ${currentSystem?.courseTitle}`}
                        </Typography>
                        <Typography
                            className={element('star')}
                            variant={typographyVariant.regular14}
                        >
                            {`Звезда: ${currentSystem?.courseThemeTitle}`}
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
                            title={'Посмотреть'}
                            color={buttonColor.filled}
                            size={buttonSize.large}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};
