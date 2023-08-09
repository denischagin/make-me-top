import toast from 'react-hot-toast';

import { useAppDispatch } from '@app/providers/store/hooks';

import { acceptOrRejectCourseRequest } from '@entities/keeper/thunks/acceptOrRejectCourseRequest';

import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { Rating } from '@shared/Rating';
import { RouterLink } from '@shared/RouterLink';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { URL_EXPLORER } from '@shared/constants/links';

import { EducationApplicationCardInterface } from './interfaces';
import { avatarSize } from '@shared/Avatar/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const EducationApplicationCard = (props: EducationApplicationCardInterface) => {
    const {
        user,
    } = props;

    const [block, element] = bem('application-education-card');

    const dispatch = useAppDispatch();

    const TOAST_SUCCES_REJECTED = 'Заявка на обучение отклонена';
    const TOAST_SUCCES_APPROVED = 'Заявка на обучение подтверждена';

    return (
        <div className={block()}>
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar size={avatarSize.medium} />
                        <div className={element('about')}>
                            <Typography variant={typographyVariant.regular14}>
                                {`Звезда: ${user?.courseTitle}`}
                            </Typography>
                            <Typography
                                className={element('user-name')}
                                variant={typographyVariant.medium16}
                            >
                                {getUserFullName(user)}
                            </Typography>
                        </div>
                    </div>
                    <div className={element('extra-content')}>
                        <div className={element('rating')}>
                            <Rating
                                starColor={ratingStarColor.primary500}
                                size={ratingSize.large}
                                scoreColor={ratingScoreColor.white}
                                rating={0}
                                reflect
                            />
                        </div>
                        <div className={element('buttons')}>
                            <Button
                                title={'Отклонить'}
                                size={buttonSize.large}
                                onClick={() => {
                                    dispatch(acceptOrRejectCourseRequest({
                                        requestId: user.requestId,
                                        rejection: {
                                            approved: false,
                                        },
                                    },
                                    ));
                                    toast(TOAST_SUCCES_REJECTED, {
                                        icon: '😔',
                                    });
                                }}
                            />
                            <RouterLink to={`${URL_EXPLORER}/${user?.personId}`}>
                                <Button
                                    title={'Принять'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                    onClick={() => {
                                        dispatch(acceptOrRejectCourseRequest({
                                            requestId: user.requestId,
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
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
