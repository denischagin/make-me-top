import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from '@app/providers/store/hooks';

import { closeCourseRequest } from '@entities/explorer/thunks/closeCourseRequest';

import { acceptOrRejectCourseRequest } from '@entities/keeper/thunks/acceptOrRejectCourseRequest';

import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { ConfirmModal } from '@shared/ConfirmModal';
import { Rating } from '@shared/Rating';
import { RouterLink } from '@shared/RouterLink';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { URL_EXPLORER } from '@shared/constants/links';
import { CONFIRM_CANCEL_STUDYING_REQUEST } from '@shared/constants/modalTitles';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toasts';

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
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    return (
        <div className={block()}>
            {
                isAcceptModalOpen &&
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_STUDYING_REQUEST}
                    rejectButtonTitle='Нет, хочу продолжить'
                    submitButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                    onSubmit={() => {
                        dispatch(acceptOrRejectCourseRequest({
                            requestId: user.requestId,
                            rejection: {
                                approved: false,
                            },
                        }));
                        toast(TOAST_SUCCESS_REJECTED, {
                            icon: '😔',
                        });
                        setIsAcceptModalOpen(false);
                    }}
                />
            }
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar size={avatarSize.medium} />
                        <div className={element('about')}>
                            <Typography variant={typographyVariant.regular14}>
                                {`Система: ${user?.courseTitle}`}
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
                                onClick={() => setIsAcceptModalOpen(true)}
                            />
                            <RouterLink to={`${URL_EXPLORER}/${user?.personId}`}>
                                <Button
                                    title={'Принять'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                />
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
