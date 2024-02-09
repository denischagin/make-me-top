import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { Rating } from '@shared/ui/Rating';
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/ui/Rating/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import { RequestRatingCardProps } from '@entities/user/ui/RequestRatingCard/interface';
import './styles.scss';

export const RequestRatingCard = (props: RequestRatingCardProps) => {
    const { requestId, responseDate, rating, personId } = props;

    const [block, element] = bem('request-rating-card');

    return (
        <Card key={requestId} size={cardSize.large} glow>
            <div className={block()}>
                <Avatar size={avatarSize.medium} personId={personId} />

                <div className={element('content')}>
                    <Typography variant={typographyVariant.medium14}>
                        Дата принятия: {responseDate}
                    </Typography>
                    <Typography variant={typographyVariant.medium16}>
                        {getUserFullName(props)}
                    </Typography>
                </div>
                <Rating
                    systemColor={ratingSystemColor.primary500}
                    size={ratingSize.large}
                    scoreColor={ratingScoreColor.white}
                    rating={rating}
                />
            </div>
        </Card>

    );
};