import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Stack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils';
import { stackDirection, stackSpacing } from '@shared/ui/Stack/interface';
import { FeedbackOfferCardProps } from './interface';
import './styles.scss';

export const FeedbackOfferCard = ({ heading, title, buttons }: FeedbackOfferCardProps) => {
    const [block, element] = bem('feedback-offer-card');

    return (
        <Card size={cardSize.large}>
            <div className={block()}>
                <Stack>
                    <Typography variant={typographyVariant.regular16}>
                        {title}
                    </Typography>
                    <Typography variant={typographyVariant.h3}>
                        {heading}
                    </Typography>
                </Stack>

                <Stack direction={stackDirection.horizontal} spacing={stackSpacing.medium}>
                    {buttons}
                </Stack>
            </div>
        </Card>
    );
};
