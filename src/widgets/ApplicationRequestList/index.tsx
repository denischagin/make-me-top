import { bem, getUserFullName } from '@shared/utils';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { ApplicationRequestListProps } from '@widgets/ApplicationRequestList/interface';
import { getUrlHomeworkWithRequestId } from '@shared/constants/links';
import { CircleBadge } from '@shared/ui/CircleBadge';
import './styles.scss';

export const ApplicationRequestList = ({
                                           requestList,
                                       }: ApplicationRequestListProps) => {
    const [block, element] = bem('application-request-list');

    if (!requestList.length) return null;

    return (
        <div className={block()}>
            <Typography
                as='h2'
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Запросы на проверку
            </Typography>

            <div className={element('card')}>
                {requestList?.map((reviewRequest) => (
                    <CircleBadge
                        emptyContent
                        showBadge={reviewRequest?.status.status === 'CHECKING'}
                        key={reviewRequest.personId}
                    >
                        <CardWithExtraButton
                            fullName={getUserFullName(reviewRequest)}
                            content={
                                <div>
                                    <Typography variant={typographyVariant.regular14}>
                                        {`Система: ${reviewRequest.courseTitle}`}
                                    </Typography>

                                    <Typography variant={typographyVariant.regular14}>
                                        {`Планета: ${reviewRequest.courseThemeTitle}`}
                                    </Typography>
                                </div>
                            }
                            buttonContent={'Оценить'}
                            buttonHref={getUrlHomeworkWithRequestId({
                                requestId: reviewRequest?.requestId ?? 0,
                                homeworkId: reviewRequest?.homeworkId ?? 0,
                            })}
                        />
                    </CircleBadge>
                ))}
            </div>
        </div>
    );
};
