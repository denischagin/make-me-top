import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';
import { Typography } from '@shared/ui/Typography';

import { FinalAssessmentsInterface } from '@entities/keeper/model/types/interfaces';

import { bem } from '@shared/utils/helpers/bem';

import { EducationApplications } from '@widgets/EducationApplications';
import { ExplorerItemList } from '@widgets/ExplorerItemList';
import { GradeApplications } from '@widgets/GradeApplications';
import { Header } from '@widgets/Header/ui/Header';
import { KeeperUserInfo } from '@widgets/KeeperUserInfo';

import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import Spinner from '@shared/ui/Spinner';
import { ApprovedEducationApplications } from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplications';
import { CurrentEducationGroup } from '@widgets/CurrentEducationGroup/ui/CurrentEducationGroup';
import { ApplicationCard } from '@shared/ui/ApplicationCard';
import { ApplicationRequestList } from '@widgets/ApplicationRequestList';
import { MarkRequestList } from '@widgets/MarkRequestList';

export const Keeper = () => {
    const [block, element] = bem('keeper');

    const {
        data: userInfo,
        isSuccess,
        isFetching,
    } = useGetKeeperProfileQuery();

    if (!isSuccess)
        return (
            <>
                <BackgroundProfile />
                <div className={block()}>
                    <Header />
                </div>
            </>
        );

    const {
        studyingExplorers,
        studyRequests,
        reviewRequests,
        finalAssessments,
    } = userInfo;

    return (
        <>
            {isFetching && <Spinner loading />}
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <Container className={element('container')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <KeeperUserInfo />

                            <CurrentEducationGroup />

                            <MarkRequestList markRequestList={finalAssessments} />

                            <ApplicationRequestList requestList={reviewRequests} />

                            <EducationApplications
                                applications={studyRequests}
                            />

                            <ApprovedEducationApplications />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
