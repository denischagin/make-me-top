import { EducationApplicationCard } from '@shared/EducationApplicationCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { EducationApplicationsInterface } from './interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const EducationApplications = (props: EducationApplicationsInterface) => {
    const {
        applications,
    } = props;

    const [block, element] = bem('education-application');

    if (!applications.length) {
        return null;
    }

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Заявки на обучение
            </Typography>
            <div className={element('cards')}>
                {
                    (applications?.length)
                        ? applications?.map((application) => (
                            <EducationApplicationCard
                                key={application.requestId}
                                user={application}
                            />
                        ))
                        : <Typography variant={typographyVariant.medium16}>
                            Заявки отсутствуют
                        </Typography>
                }
            </div>
        </div>
    );
};
