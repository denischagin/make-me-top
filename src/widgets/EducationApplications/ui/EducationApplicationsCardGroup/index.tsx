import { EducationApplicationsCardGroupProps } from './interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { EducationApplicationCard } from '@shared/ui/EducationApplicationCard';
import { CardDetails, CardDetailsContent, CardDetailsIcon, CardDetailsSummary } from '@shared/ui/CardDetails';
import { Stack } from '@shared/ui/Stack';
import { bem } from '@shared/utils';
import './styles.scss';

export const EducationApplicationsCardGroup = (props: EducationApplicationsCardGroupProps) => {
    const [block, element] = bem('education-applications-card-group');
    const { groupName, studyRequests } = props;

    return (
        <CardDetails
            className={block()}
            renderSummary={({ isActive, handleToggle }) => (
                <CardDetailsSummary
                    isActive={isActive}
                    onClick={handleToggle}
                    className={element('summary')}
                >
                    <div className={element('summary-text')}>
                        <Typography variant={typographyVariant.h2}>
                            {groupName}
                        </Typography>
                        <Typography variant={typographyVariant.regular16}>
                            Количество заявок: {studyRequests?.length}
                        </Typography>
                    </div>

                    <CardDetailsIcon isActive={isActive} />
                </CardDetailsSummary>
            )}
            renderContent={({ isActive }) => (
                <CardDetailsContent isActive={isActive}>
                    <Stack>
                        {studyRequests.map((request) => (
                            <EducationApplicationCard user={request} key={request.requestId} />
                        ))}
                    </Stack>
                </CardDetailsContent>
            )}
        />
    );

};