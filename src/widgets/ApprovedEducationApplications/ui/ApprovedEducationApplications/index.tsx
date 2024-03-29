import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import {
    ApprovedEducationApplicationsGroup,
} from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplicationsGroup';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { Stack } from '@shared/ui/Stack';
import { stackSpacing } from '@shared/ui/Stack/interface';

export const ApprovedEducationApplications = () => {
    const [, element] = bem('approved-education-applications');

    const { data: userInfo } = useGetKeeperProfileQuery();
    const courses = userInfo?.approvedRequests ?? [];

    if (courses.length === 0) return null;

    return (
        <Stack spacing={stackSpacing.large}>
            <Typography
                as='h2'
                variant={typographyVariant.h2}
            >
                Принятые заявки
            </Typography>

            <div className={element('group-wrapper')}>
                {courses.map((course, index) => (
                    <ApprovedEducationApplicationsGroup
                        key={course.courseId}
                        course={course}
                        canStartEducation={!userInfo?.currentGroup}
                    />
                ))}
            </div>
        </Stack>
    );
};