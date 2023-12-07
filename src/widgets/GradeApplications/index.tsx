import { GradeApplicationCard } from '@shared/ui/GradeApplicationCard';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { GradeApplicationsInterface } from './interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const GradeApplications = (props: GradeApplicationsInterface) => {
    const {
        finalAssessment,
        reviewRequest,
    } = props;

    const [block, element] = bem('grade-application');

    if (!finalAssessment?.length && !reviewRequest?.length) {
        return null;
    }

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Запросы на проверку
            </Typography>

            <div className={element('cards')}>
                {reviewRequest?.map((application) => (
                    <GradeApplicationCard
                        key={application.personId}
                        reviewRequest={application}
                    />
                ))}
                {finalAssessment?.map((application) => (
                    <GradeApplicationCard
                        key={application.personId}
                        finalAssessment={application}
                    />
                ))}
            </div>
        </div>
    );
};
