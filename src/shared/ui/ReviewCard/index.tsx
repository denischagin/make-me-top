import { Avatar } from '@shared/ui/Avatar';
import { Card } from '@shared/ui/Card';
import { Rating } from '@shared/ui/Rating';
import { ShowMoreTextModal } from '@shared/ui/ShowMoreTextModal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import { ReviewCardInterface } from '@shared/types/common';

import './styles.scss';

export const ReviewCard = (props: ReviewCardInterface) => {
    const {
        review,
        review: {
            courseTitle,
            rating,
            comment,
        },
    } = props;

    const [block, element] = bem('review-card');

    return (
        <div className={block()}>
            <Card
                size={cardSize.medium}
                glow
            >
                <div className={element('content')}>
                    <div className={element('heading')}>
                        <Typography
                            className={element('planet-name')}
                            variant={typographyVariant.regular14}
                        >
                            {courseTitle}
                        </Typography>
                        <Rating
                            scoreColor={ratingScoreColor.white}
                            systemColor={ratingSystemColor.primary500}
                            size={ratingSize.medium}
                            rating={rating}
                        />
                    </div>
                    <div className={element('user')}>
                        <Avatar size={avatarSize.small} />
                        <Typography variant={typographyVariant.regular16}>
                            {getUserFullName(review)}
                        </Typography>
                    </div>
                    {
                        <ShowMoreTextModal
                            text={comment}
                            maxLength={180}
                            typographySettings={{
                                variant: typographyVariant.regular14,
                            }}
                        >
                            <div className={element('user')}>
                                <Avatar size={avatarSize.large} />
                                <div className={element('user-info')}>
                                    <Typography
                                        variant={typographyVariant.regular14}
                                        color={typographyColor.black}
                                        className={element('planet-name')}
                                    >
                                        {courseTitle}
                                    </Typography>
                                    <Typography
                                        variant={typographyVariant.h1}
                                        color={typographyColor.black}
                                        className={element('user-name')}
                                    >
                                        {getUserFullName(review)}
                                    </Typography>
                                    <Rating
                                        scoreColor={ratingScoreColor.black}
                                        systemColor={
                                            ratingSystemColor.primary500
                                        }
                                        size={ratingSize.medium}
                                        rating={rating}
                                    />
                                </div>
                            </div>
                            <Typography
                                variant={typographyVariant.medium16}
                                color={typographyColor.black}
                                className={element('review-text')}
                            >
                                {comment}
                            </Typography>
                        </ShowMoreTextModal>
                    }
                </div>
            </Card>
        </div>
    );
};
