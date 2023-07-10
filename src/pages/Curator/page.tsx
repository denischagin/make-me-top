import { useEffect } from 'react';

import { useAppDispatch } from '@app/providers/store/hooks';

import { getUserData } from '@entities/user/thunks/getUserData';

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

import {
    APPLICATIONS_LIST,
    GRADE_APPLICATIONS_LIST,
    MY_EXPLORERS,
} from './model';

import './styles.scss';

export const Curator = () => {
    const [block, element] = bem('curator');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserData({}));
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
                            <EducationApplications applications={APPLICATIONS_LIST} />
                            <div className={element('final-grade-cards')}>
                                <Typography
                                    className={element('final-grade-heading', 'mb-4 mt-1')}
                                    variant={typographyVariant.h2}
                                >
                                    Итоговая оценка
                                </Typography>
                                <GradeApplicationCard user={GRADE_APPLICATIONS_LIST[0]} />
                            </div>
                            <GradeApplications applications={GRADE_APPLICATIONS_LIST} />
                        </div>
                        <div className={element('explorers-list', 'col-xxl-3')}>
                            <ExplorerCardList explorers={MY_EXPLORERS} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
