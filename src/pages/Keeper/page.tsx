import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';
import { GradeApplicationCard } from '@shared/ui/GradeApplicationCard';
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

export const Keeper = () => {
    const [block, element] = bem('keeper');

    const { data: userInfo, isSuccess } = useGetKeeperProfileQuery();

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
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <Container className={element('container')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <KeeperUserInfo />
                            <EducationApplications
                                applications={studyRequests}
                            />
                            {!!finalAssessments?.length && (
                                <div className={element('final-grade-cards')}>
                                    <Typography
                                        className={element(
                                            'final-grade-heading',
                                            'mb-4 mt-1',
                                        )}
                                        variant={typographyVariant.h2}
                                    >
                                        Итоговая оценка
                                    </Typography>
                                    {finalAssessments?.map(
                                        (asset: FinalAssessmentsInterface) => (
                                            <GradeApplicationCard
                                                key={asset.personId}
                                                finalAssessment={asset}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                            <GradeApplications reviewRequest={reviewRequests} />
                        </div>
                        <div className={element('explorers-list', 'col-xxl-3')}>
                            <ExplorerItemList explorers={studyingExplorers} />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
