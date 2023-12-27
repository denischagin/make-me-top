import { bem, getUserFullName } from '@shared/utils';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { Stack } from '@shared/ui/Stack';
import { FeedbackOfferCard } from '@entities/user';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

export const FeedbackOfferKeeper = () => {
    const [block, element] = bem('feedback-offer-keeper');

    const { data: keeperInfo } = useGetKeeperProfileQuery();

    return (
        <Stack className={block()}>
            {keeperInfo?.keeperFeedbacks?.map((explorer) => (
                <FeedbackOfferCard
                    title={`Вам исследователь на системе ${explorer.courseTitle}?`}
                    heading={getUserFullName(explorer)}
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
