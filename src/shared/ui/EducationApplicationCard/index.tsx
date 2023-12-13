import { useState } from 'react';
import toast from 'react-hot-toast';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { Rating } from '@shared/ui/Rating';
import { RouterLink } from '@shared/ui/RouterLink';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { getUrlExplorerById } from '@shared/constants/links';
import { CONFIRM_CANCEL_STUDYING_REQUEST } from '@shared/constants/modalTitles';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toasts';

import { EducationApplicationCardInterface } from './interfaces';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useStatus } from '@shared/utils/hooks/use-status';
import { useRejectCourseRequestMutation } from '@entities/course';
import { AcceptCourseRequestButton } from '@features/accept-course-request';

export const EducationApplicationCard = (
    props: EducationApplicationCardInterface,
) => {
    const { user } = props;

    const [block, element] = bem('application-education-card');
    const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

    const [rejectCourse, { isSuccess: isSuccessReject }] =
        useRejectCourseRequestMutation();

    useStatus(() => {
        toast(TOAST_SUCCESS_REJECTED, {
            icon: '😔',
        });
    }, isSuccessReject);

    const handleSubmitRejectCourse = () => {
        rejectCourse({
            requestId: user.requestId,
        });
        setIsModalRejectOpen(true);
    };

    return (
        <div className={block()}>
            <ConfirmModal
                isOpen={isModalRejectOpen}
                confirmTitle={CONFIRM_CANCEL_STUDYING_REQUEST}
                rejectButtonTitle='Нет, хочу продолжить'
                submitButtonTitle='Да, я уверен'
                onClose={() => setIsModalRejectOpen(false)}
                onSubmit={handleSubmitRejectCourse}
            />

            <Card size={cardSize.large} glow>
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar size={avatarSize.medium} />
                        <div className={element('about')}>
                            <Typography variant={typographyVariant.regular14}>
                                Дата запроса: {user.requestDate}
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
                                systemColor={ratingSystemColor.primary500}
                                size={ratingSize.large}
                                scoreColor={ratingScoreColor.white}
                                rating={user.rating}
                                reflect
                            />
                        </div>
                        <div className={element('buttons')}>
                            <Button
                                title={'Отклонить'}
                                size={buttonSize.large}
                                onClick={() => setIsModalRejectOpen(true)}
                            />
                            <AcceptCourseRequestButton requestId={user.requestId} />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
