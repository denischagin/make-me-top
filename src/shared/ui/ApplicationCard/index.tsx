import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { RouterLink } from '@shared/ui/RouterLink';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { getUrlHomeworkWithRequestId } from '@shared/constants/links';

import { ApplicationCardInterface } from './interfaces';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { CircleBadge } from '@shared/ui/CircleBadge';

export const ApplicationCard = (props: ApplicationCardInterface) => {
    const { finalAssessment, reviewRequest } = props;

    const [block, element] = bem('grade-application-card');

    const reviewOrAssessment = finalAssessment || reviewRequest;

    return (
        <CircleBadge emptyContent showBadge={reviewRequest?.status.status === 'CHECKING'}>
            <div className={block()}>
                <Card size={cardSize.large} glow>
                    <div className={element('content')}>
                        <div className={element('info')}>
                            <Avatar size={avatarSize.medium} personId={reviewOrAssessment?.personId} />
                            <div className={element('about')}>
                                <Typography
                                    className={element('name')}
                                    variant={typographyVariant.regular14}
                                >
                                    {getUserFullName(reviewOrAssessment)}
                                </Typography>
                                <Typography
                                    className={element('system-title')}
                                    variant={typographyVariant.regular14}
                                >
                                    {`Система: ${reviewOrAssessment?.courseTitle}`}
                                </Typography>
                                {!finalAssessment && (
                                    <Typography
                                        className={element('planet')}
                                        variant={typographyVariant.medium16}
                                    >
                                        {`Планета: ${reviewRequest?.courseThemeTitle}`}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div className={element('button')}>
                            <RouterLink
                                to={getUrlHomeworkWithRequestId({
                                    requestId: reviewRequest?.requestId!,
                                    homeworkId: reviewRequest?.homeworkId!,
                                })}
                            >
                                <Button
                                    title={'Оценить'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                />
                            </RouterLink>
                        </div>
                    </div>
                </Card>
            </div>
        </CircleBadge>
    );
};
