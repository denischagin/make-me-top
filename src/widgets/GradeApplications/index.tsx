import { GradeApplicationCard } from '@shared/GradeApplicationCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { GradeApplicationsInterface } from './interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const GradeApplications = (props: GradeApplicationsInterface) => {
    const {
        finalAssesment,
        reviewRequest,
    } = props;

    const [block, element] = bem('grade-application');

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Запрос на проверку
            </Typography>
            <div className={element('cards')}>
                {
                    finalAssesment
                        ? finalAssesment?.map((application) => (
                            <GradeApplicationCard
                                key={application.explorerId}
                                finalAssesment={application}
                            />
                        ))
                        : reviewRequest?.map((application) => (
                            <GradeApplicationCard
                                key={application.explorerId}
                                reviewRequest={application}
                            />
                        ))
                }
            </div>
        </div>
    );
};
