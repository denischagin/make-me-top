import { bem } from '@shared/utils/helpers/bem';
import { MouseEventHandler, useState } from 'react';
import { ApprovedEducationApplicationsGroupProps } from './interface';
import './styles.scss';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { RequestRatingCard } from '@entities/user/ui/RequestRatingCard';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import {
    ApprovedEducationApplicationsGroupSummary,
} from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplicationsGroupSummary';
import { useStartEducationOnCourseMutation } from '@entities/course';
import toast from 'react-hot-toast';
import { CardDetails, CardDetailsContent, CardDetailsSummary } from '@shared/ui/CardDetails';
import { Stack } from '@shared/ui/Stack';
import { onErrorHandling } from '@shared/api';


export const ApprovedEducationApplicationsGroup = ({
                                                       course,
                                                       canStartEducation = true,
                                                   }: ApprovedEducationApplicationsGroupProps) => {
    const [block, element] = bem('approved-education-application-group');
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const { data: userInfo } = useGetKeeperProfileQuery();
    const [startEducation] = useStartEducationOnCourseMutation();

    const handleClickStartEducation: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsOpenConfirm(true);
    };

    const handleSuccessStartEducation = () => {
        toast('Обучение успешно началось', {
            icon: '🤩',
        });
        setIsOpenConfirm(false);
    };

    const handleErrorStartEducation = (err: unknown) => {
        setIsOpenConfirm(false);
    };

    const handleSubmitStartEducation = () => {
        startEducation(course.courseId)
            .unwrap()
            .then(handleSuccessStartEducation)
            .catch(handleErrorStartEducation);
    };
    const handleCloseConfirm = () => setIsOpenConfirm(false);

    const explorersToEducation =
        course.requests.slice(0, userInfo?.person.maxExplorers).map((request) =>
            getUserFullName(request));

    return (
        <>
            <ConfirmModal
                confirmTitle='Вы уверены, что хотите начать обучение?'
                confirmDescription={`На обучение попадут: ${explorersToEducation}`}
                rejectButtonTitle='Нет, хочу еще подумать'
                submitButtonTitle='Да, конечно хочу!'
                onSubmit={handleSubmitStartEducation}
                onClose={handleCloseConfirm}
                isOpen={isOpenConfirm}
            />

            <div className={block()}>
                <CardDetails
                    renderSummary={({ isActive, handleToggle }) => (
                        <CardDetailsSummary isActive={isActive} onClick={handleToggle}>
                            <ApprovedEducationApplicationsGroupSummary
                                courseTitle={course.courseTitle}
                                courseRequestsCount={course.requests.length}
                                onStartEducation={handleClickStartEducation}
                                canStartEducation={canStartEducation}
                                isActive={isActive}
                            />
                        </CardDetailsSummary>
                    )}
                    renderContent={({ isActive }) => (
                        <CardDetailsContent isActive={isActive}>
                            <Stack>
                                {course.requests.map((request, index) => (
                                    <RequestRatingCard key={request.requestId} {...request} />
                                ))}
                            </Stack>
                        </CardDetailsContent>
                    )}
                />
            </div>

        </>
    );
};