import { useEffect } from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { curatorInfoSelector } from '@entities/curator/model/selectors';
import { getKeeperData } from '@entities/curator/thunks/getKeeperData';

import { BackgroundProfile } from '@shared/BackgroundProfile';
import { GradeApplicationCard } from '@shared/GradeApplicationCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CuratorUserInfo } from '@widgets/CuratorUserInfo';
import { EducationApplications } from '@widgets/EducationApplications';
import { ExplorerCardList } from '@widgets/ExplorerCardList';
import { GradeApplications } from '@widgets/GradeApplications';
import { Header } from '@widgets/Header';

import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const Curator = () => {
    const [block, element] = bem('curator');

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(curatorInfoSelector);

    const {
        studyingExplorers,
        studyRequests,
        reviewRequests,
        finalAssessments,
    } = userInfo;

    useEffect(() => {
        dispatch(getKeeperData({}));
    }, []);

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <div className={element('container', 'container p-0')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <CuratorUserInfo />
                            <EducationApplications applications={studyRequests} />
                            <div className={element('final-grade-cards')}>
                                <Typography
                                    className={element('final-grade-heading', 'mb-4 mt-1')}
                                    variant={typographyVariant.h2}
                                >
                                    Итоговая оценка
                                </Typography>
                                {
                                    finalAssessments?.map((asset) => (
                                        <GradeApplicationCard
                                            key={asset.explorerId}
                                            finalAssesment={asset}
                                        />
                                    ))
                                }
                            </div>
                            <GradeApplications reviewRequest={reviewRequests} />
                        </div>
                        <div className={element('explorers-list', 'col-xxl-3')}>
                            <ExplorerCardList explorers={studyingExplorers} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
