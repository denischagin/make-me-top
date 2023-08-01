import { useAppSelector } from '@app/providers/store/hooks';

import { explorerCardInfoSelector } from '@entities/explorer/model/selectors';

import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ReviewRequestCard = () => {
    const [block, element] = bem('review-request-card');

    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        reviewRequest,
    } = userInfo;

    if (!reviewRequest) {
        return null;
    }

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Запрос на проверку:
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
                            {`Планета: ${reviewRequest?.courseId}. ${reviewRequest?.courseTitle}`}
                        </Typography>
                        <Typography
                            className={element('star')}
                            variant={typographyVariant.regular14}
                        >
                            {`Звезда: ${reviewRequest?.courseThemeTitle}`}
                        </Typography>
                    </div>
                    <div className={element('buttons')}>
                        <div className={element('hidden-button')}>
                            <Button
                                title={'Отклонить'}
                                size={buttonSize.large}
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
