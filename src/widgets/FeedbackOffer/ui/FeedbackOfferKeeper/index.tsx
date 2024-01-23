import { bem, getUserFullName } from '@shared/utils';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { Stack } from '@shared/ui/Stack';
import { FeedbackOfferCard, useRejectKeeperFeedbackOfferMutation } from '@entities/feedback';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { ButtonRejectFeedback } from '@features/reject-feedback';
import { ButtonCreateFeedback, ModalCreateFeedbackKeeper } from '@features/create-feedback';

export const FeedbackOfferKeeper = () => {
    const [block, element] = bem('feedback-offer-keeper');

    const { data: keeperInfo } = useGetKeeperProfileQuery();
    const [rejectKeeperFeedback] = useRejectKeeperFeedbackOfferMutation();

    const handleRejectKeeperFeedback = (explorerId: number) => () => {
        rejectKeeperFeedback(explorerId);
    };

    return (
        <Stack className={block()}>
            {keeperInfo?.keeperFeedbacks?.map(({ courseTitle, explorerId, ...explorer }) => (
                <FeedbackOfferCard
                    key={explorerId}
                    title={`Вам понравился исследователь на системе ${courseTitle}?`}
                    heading={getUserFullName(explorer)}
                    buttons={(
                        <>
                            <ButtonRejectFeedback
                                title={'Отклонить'}
                                size={buttonSize.small}
                                onSubmit={handleRejectKeeperFeedback(explorerId)}
                            />

                            <ButtonCreateFeedback
                                renderModal={(modalProps) => (
                                    <ModalCreateFeedbackKeeper explorerId={explorerId} {...modalProps} />
                                )}
                            />
                        </>
                    )}
                />
            ))}
        </Stack>
    );
};
