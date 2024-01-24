import { bem } from '@shared/utils';
import { Stack } from '@shared/ui/Stack';
import { stackSpacing } from '@shared/ui/Stack/interface';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { FeedbackOfferKeeper } from '@widgets/FeedbackOffer/ui/FeedbackOfferKeeper';

export const FeedbackOfferKeeperProfile = () => {
    const [block, element] = bem('feedback-offer');

    const { data: keeperInfo } = useGetKeeperProfileQuery();

    if (!keeperInfo?.keeperFeedbacks?.length)
        return null;


    return (
        <div className={block()}>
            <Stack spacing={stackSpacing.large}>
                <Typography as='h2' variant={typographyVariant.h2}>
                    Отзывы:
                </Typography>

                <FeedbackOfferKeeper />
            </Stack>
        </div>
    );
};
