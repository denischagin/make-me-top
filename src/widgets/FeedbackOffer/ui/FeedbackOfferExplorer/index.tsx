import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { Stack } from '@shared/ui/Stack';
import { bem, getUserFullName } from '@shared/utils';
import './styles.scss';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { FeedbackOfferCard, useRejectExplorerFeedbackOfferMutation } from '@entities/feedback';
import { ButtonRejectFeedback } from '@features/reject-feedback';
import { ButtonCreateFeedback, ModalCreateFeedbackExplorer } from '@features/create-feedback';

export const FeedbackOfferExplorer = () => {
    const { data: explorerInfo } = useGetExplorerProfileQuery();

    const [block, element] = bem('feedback-offer-explorer');

    const [rejectExplorerFeedback] = useRejectExplorerFeedbackOfferMutation();

    const handleRejectExplorerFeedback = (explorerId: number) => () => {
        rejectExplorerFeedback(explorerId);
    };

    return (
        <Stack className={block()}>
            {explorerInfo?.explorerFeedbacks?.map(({ courseTitle, explorerId, ...keeper }) => (
                <FeedbackOfferCard
                    title={`Вам понравился хранитель на системе ${courseTitle}?`}
                    heading={getUserFullName(keeper)}
                    buttons={(
                        <>
                            <ButtonRejectFeedback
                                title={'Отклонить'}
                                size={buttonSize.small}
                                onSubmit={handleRejectExplorerFeedback(explorerId)}
                            />

                            <ButtonCreateFeedback
                                renderModal={(modalProps) => (
                                    <ModalCreateFeedbackExplorer explorerId={explorerId} {...modalProps} />
                                )}
                            />
                        </>
                    )}
                />
            ))}
        </Stack>
    );
};
