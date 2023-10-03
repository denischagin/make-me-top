import React from 'react';
import { Avatar } from '@shared/ui/Avatar';
import { Card } from '@shared/ui/Card';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { KeeperRatingCardProps } from './interface';

import './style.scss';

export const KeeperRatingCard = ({
    fullname,
    rating,
}: KeeperRatingCardProps) => {
    const [block, element] = bem('keeper-rating-card');

    return (
        <div className={block()}>
            <Card size={cardSize.medium}>
                <Avatar size={avatarSize.large} />
                <Typography variant={typographyVariant.medium14}>
                    {fullname}
                </Typography>
                <Rating
                    scoreColor={ratingScoreColor.white}
                    systemColor={ratingSystemColor.primary500}
                    size={ratingSize.medium}
                    rating={rating}
                />
            </Card>
        </div>
    );
};
