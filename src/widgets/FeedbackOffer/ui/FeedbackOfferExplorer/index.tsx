import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { Stack } from '@shared/ui/Stack';
import { bem, getUserFullName } from '@shared/utils';
import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { FeedbackOfferCard, useRejectExplorerFeedbackOfferMutation } from '@entities/feedback';
import { ButtonRejectFeedback } from '@features/reject-feedback';

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

                            <Button
                                title={'Оставить отзыв'}
                                size={buttonSize.small}
                                color={buttonColor.filled}
                            />
                        </>
                    )}
                />
            ))}
        </Stack>
    );
};
