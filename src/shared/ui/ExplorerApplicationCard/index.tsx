import { MouseEventHandler, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerCardInfoQuery } from '@entities/explorer/api/api';
import { useParams } from 'react-router-dom';
import { AcceptCourseRequestButton } from '@features/accept-course-request';
import { RejectCourseRequestModal } from '@features/reject-course-request';


export const ExplorerApplicationCard = () => {
    const [block, element] = bem('explorer-application-card');
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const { personId } = useParams();

    const { data: userInfo, isSuccess } = useGetExplorerCardInfoQuery(
        Number(personId),
    );

    const studyRequestOrCurrentSystem =
        userInfo?.currentSystem || userInfo?.studyRequest;

    const requestId = userInfo?.studyRequest?.requestId!;


    if (!isSuccess) return null;

    const { studyRequest, currentSystem } = userInfo;

    if (!currentSystem && !studyRequest) {
        return null;
    }

    const handleCloseRejectModal = () => {
        setIsRejectModalOpen(false);
    };

    return (
        <>
            <RejectCourseRequestModal
                requestId={requestId}
                isOpen={isRejectModalOpen}
                onClose={handleCloseRejectModal}
            />

            <div className={block()}>
                <Typography
                    className={element('heading', 'mb-4 mt-5')}
                    variant={typographyVariant.h2}
                >
                    {!!currentSystem
                        ? 'Текущая система:'
                        : 'Заявка на обучение:'}
                </Typography>
                <Card size={cardSize.large} glow>
                    <div className={element('content')}>
                        <div className={element('info')}>
                            <Typography
                                className={element('planet')}
                                variant={typographyVariant.h2}
                            >
                                Система: {studyRequestOrCurrentSystem?.courseId}
                                . {studyRequestOrCurrentSystem?.courseTitle}
                            </Typography>
                            <Typography
                                className={element('system')}
                                variant={typographyVariant.regular14}
                            >
                                {!!currentSystem
                                    ? `Система: ${currentSystem.courseThemeTitle}`
                                    : `Галактика: ${studyRequest?.galaxyName}`}
                            </Typography>
                        </div>
                        <div className={element('buttons')}>
                            {!currentSystem && (
                                <>
                                    <Button
                                        title={'Отклонить'}
                                        size={buttonSize.large}
                                        onClick={() => setIsRejectModalOpen(true)}
                                    />
                                    <AcceptCourseRequestButton requestId={requestId} />
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};
