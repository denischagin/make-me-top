import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { Stack } from '@shared/ui/Stack';
import { bem, getUserFullName } from '@shared/utils';
import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { FeedbackOfferCard } from '@entities/user/ui/FeedbackOfferCard/ui';

export const FeedbackOfferExplorer = () => {
    const { data: explorerInfo } = useGetExplorerProfileQuery();

    const [block, element] = bem('feedback-offer-explorer');

    return (
        <Stack className={block()}>
            {explorerInfo?.explorerFeedbacks?.map((keeper) => (
                <FeedbackOfferCard
                    title={`Вам понравился хранитель на системе ${keeper.courseTitle}?`}
                    heading={getUserFullName(keeper)}
                    buttons={(
                        <>
                            <Button title={'Отклонить'} size={buttonSize.small} />

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
