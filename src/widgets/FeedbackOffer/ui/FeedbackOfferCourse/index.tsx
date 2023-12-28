import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { bem } from '@shared/utils';
import { Stack } from '@shared/ui/Stack';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { FeedbackOfferCard, useRejectCourseFeedbackOfferMutation } from '@entities/feedback';
import { ButtonRejectFeedback } from '@features/reject-feedback';
import { ButtonCreateFeedback, ModalCreateCourseRating } from '@features/create-feedback';

export const FeedbackOfferCourse = () => {
    const { data: explorerInfo } = useGetExplorerProfileQuery();

    const [block, element] = bem('feedback-offer-course');

    const [rejectCourseFeedback] = useRejectCourseFeedbackOfferMutation();

    const handleRejectCourseFeedback = (explorerId: number) => () => {
        rejectCourseFeedback(explorerId);
    };

    return (
        <Stack className={block()}>
            {explorerInfo?.courseFeedbacks?.map(({ explorerId, courseTitle }) => (
                <>
                    <FeedbackOfferCard
                        title={`Вам понравился курс?`}
                        heading={courseTitle}
                        buttons={(
                            <>
                                <ButtonRejectFeedback
                                    title={'Отклонить'}
                                    size={buttonSize.small}
                                    onSubmit={handleRejectCourseFeedback(explorerId)}
                                />

                                <ButtonCreateFeedback
                                    renderModal={(modalProps) => (
                                        <ModalCreateCourseRating explorerId={explorerId} {...modalProps} />
                                    )}
                                />
                            </>
                        )}
                    />
                </>
            ))}

        </Stack>
    );
};