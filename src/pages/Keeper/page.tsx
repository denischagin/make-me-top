import { useEffect } from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { keeperInfoSelector } from '@entities/keeper/model/selectors';
import { FinalAssessmentsInterface } from '@entities/keeper/model/types/interfaces';
import { getKeeperInfo } from '@entities/keeper/thunks/getKeeperInfo';

import { BackgroundProfile } from '@shared/BackgroundProfile';
import { GradeApplicationCard } from '@shared/GradeApplicationCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { EducationApplications } from '@widgets/EducationApplications';
import { ExplorerItemList } from '@widgets/ExplorerItemList';
import { GradeApplications } from '@widgets/GradeApplications';
import { Header } from '@widgets/Header';
import { KeeperUserInfo } from '@widgets/KeeperUserInfo';

import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const Keeper = () => {
    const [block, element] = bem('keeper');

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(keeperInfoSelector);

    const {
        studyingExplorers,
        studyRequests,
        reviewRequests,
        finalAssessments,
    } = userInfo;

    useEffect(() => {
        dispatch(getKeeperInfo({}));
    }, []);

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <div className={element('container', 'container p-0')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <KeeperUserInfo />
                            <EducationApplications applications={studyRequests} />
                            {
                                !!finalAssessments?.length &&
                                <div className={element('final-grade-cards')}>
                                    <Typography
                                        className={element('final-grade-heading', 'mb-4 mt-1')}
                                        variant={typographyVariant.h2}
                                    >
                                        Итоговая оценка
                                    </Typography>
                                    {
                                        finalAssessments?.map((asset: FinalAssessmentsInterface) => (
                                            <GradeApplicationCard
                                                key={asset.personId}
                                                finalAssessment={asset}
                                            />
                                        ))
                                    }
                                </div>
                            }
                            <GradeApplications reviewRequest={reviewRequests} />
                        </div>
                        <div className={element('explorers-list', 'col-xxl-3')}>
                            <ExplorerItemList explorers={studyingExplorers} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
