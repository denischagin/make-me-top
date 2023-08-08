import { toast } from 'react-hot-toast';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';
import { closeCourseRequest } from '@entities/explorer/thunks/closeCourseRequest';

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


export const MasteringApplication = () => {

    const [block, element] = bem('current-star-card');

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerInfoSelector);

    const TOAST_SUCCES_REJECTED = 'Заявка на обучение отклонена';

    const {
        studyRequest,
    } = userInfo;

    if (!studyRequest) {
        return null;
    }

    return (
        <div className={block()}>
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
                <Typography
                    variant={typographyVariant.h2}
                    className={element('heading')}
                >
                    {`Звезда: ${studyRequest.courseTitle}`}
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
                    {`Преподаватель: ${studyRequest.keeperLastName} ${studyRequest.keeperFirstName} ${studyRequest.keeperPatronymic}`}
                </Typography>
                <div className={element('buttons')}>
                    <Button
                        size={buttonSize.large}
                        title="Отменить заявку"
                        onClick={() => {
                            dispatch(closeCourseRequest({
                                payload: {
                                    requestId: studyRequest.requestId,
                                },
                            }));
                            toast(TOAST_SUCCES_REJECTED, {
                                icon: '😔',
                            });
                        }}
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.filled}
                        title="Продолжить"
                    />
                </div>
            </Card>
        </div>
    );
};
