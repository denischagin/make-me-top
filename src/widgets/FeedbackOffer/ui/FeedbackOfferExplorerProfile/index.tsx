import { bem } from '@shared/utils';
import { Stack } from '@shared/ui/Stack';
import { stackSpacing } from '@shared/ui/Stack/interface';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { roles } from '@shared/constants/storageKeys';
import { ReactElement } from 'react';
import { FeedbackOfferExplorer } from '@widgets/FeedbackOffer/ui/FeedbackOfferExplorer';
import { FeedbackOfferCourse } from '@widgets/FeedbackOffer/ui/FeedbackOfferCourse';
import { FeedbackOfferKeeper } from '@widgets/FeedbackOffer/ui/FeedbackOfferKeeper';

const feedbackByRole: Record<roles, ReactElement> = {
    EXPLORER: (
        <>
        </>
    ),
    KEEPER: (
        <FeedbackOfferKeeper />
    ),
};

export const FeedbackOfferExplorerProfile = () => {
    const [block, element] = bem('feedback-offer');

    const { data: explorerInfo } = useGetExplorerProfileQuery();

    if (
        !explorerInfo?.courseFeedbacks?.length &&
        !explorerInfo?.explorerFeedbacks?.length
    ) return null;


    return (
        <div className={block()}>
            <Stack spacing={stackSpacing.large}>
                <Typography as='h2' variant={typographyVariant.h2}>
                    Отзывы:
                </Typography>

                <FeedbackOfferExplorer />
                <FeedbackOfferCourse />
            </Stack>
        </div>
    );
};