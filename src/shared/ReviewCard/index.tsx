import { Avatar } from '@shared/Avatar';
import { Card } from '@shared/Card';
import { Rating } from '@shared/Rating';
import { ShowMoreTextModal } from '@shared/ShowMoreTextModal';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { avatarSize } from '@shared/Avatar/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/Typography/interfaces';

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
                            starColor={ratingStarColor.primary500}
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
                                        starColor={ratingStarColor.primary500}
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
