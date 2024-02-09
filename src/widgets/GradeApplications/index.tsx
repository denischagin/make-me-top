import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { GradeApplicationsInterface } from './interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { getUserFullName } from '@shared/utils';

export const GradeApplications = (props: GradeApplicationsInterface) => {
    const {
        finalAssessment,
        reviewRequest,
    } = props;

    const [block, element] = bem('grade-application');

    //TODO разделить на 2 компонента
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
                    <CardWithExtraButton
                        personId={application.personId}
                        fullName={getUserFullName(application)}
                        key={application.personId}
                        content={(
                            <div>
                                <Typography
                                    className={element('system-title')}
                                    variant={typographyVariant.regular14}
                                >
                                    {`Система: ${application.courseTitle}`}
                                </Typography>

                                <Typography
                                    variant={typographyVariant.medium16}
                                >
                                    {`Планета: ${application.courseThemeTitle}`}
                                </Typography>
                            </div>
                        )}
                        buttonContent={'Оценить'}
                    />
                ))}
                {finalAssessment?.map((application) => (
                    <CardWithExtraButton
                        personId={application.personId}
                        fullName={getUserFullName(application)}
                        key={application.personId}
                        content={(
                            <div>
                                <Typography
                                    variant={typographyVariant.regular14}
                                >
                                    {`Система: ${application.courseTitle}`}
                                </Typography>
                            </div>
                        )}
                        buttonContent={'Оценить'}
                    />
                ))}
            </div>
        </div>
    )
        ;
};
