import { useGetHomeworkRequest } from '@entities/homework';
import { useAuth } from '@entities/viewer';
import { ButtonScrollTopBottom } from '@features/scroll-top-bottom';
import NotFound from '@pages/NotFound';
import { roles } from '@shared/constants/storageKeys';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';
import Spinner from '@shared/ui/Spinner';
import { bem } from '@shared/utils/helpers/bem';
import { GradeWithComment } from '@widgets/GradeWithComment';
import { Header } from '@widgets/Header/ui/Header';
import { HomeworkContent } from '@widgets/HomeworkContent';
import { HomeworkRequests } from '@widgets/HomeworkRequests';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';
import { SendHomeworkVersionForm } from '@widgets/SendHomeworkVersionForm';
import React, { ReactElement } from 'react';
import './styles.scss';

const sendFormByRole: Record<roles, ReactElement> = {
    KEEPER: <SendGradeAndRemark />,
    EXPLORER: <SendHomeworkVersionForm />,
};

const HomeworkRequestCardPage = () => {
    const [block, element] = bem('homework-request-page');
    const { role } = useAuth();

    const getHomeworkRequest = useGetHomeworkRequest();
    const requestsInfo = getHomeworkRequest?.data;

    if (getHomeworkRequest?.isLoading)
        return (
            <>
                <BackgroundProfile />
                <Spinner loading />
            </>
        );

    if (!requestsInfo)
        return (
            <>
                <BackgroundProfile />
                <NotFound />
            </>
        );

    return (
        <div>
            <BackgroundProfile />
            <Header />
            <ButtonScrollTopBottom />
            <div className={block()}>
                <Container>
                    <div className={element('content')}>
                        <HomeworkContent />

                        {requestsInfo?.request?.status.status !== 'CLOSED' ? (
                            role && sendFormByRole[role]
                        ) : (
                            <GradeWithComment />
                        )}

                        <HomeworkRequests />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomeworkRequestCardPage;
