import React from 'react';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { UserRatingCardProps } from './interface';

import './style.scss';

export const UserRatingCard = (props: UserRatingCardProps) => {
    const { fullname, index, onClick, rating, title } = props;
    const [block, element] = bem('user-rating');

    return (
        <div className={block()} onClick={onClick}>
            <Card size={cardSize.large} glow>
                {index !== undefined && (
                    <Typography variant={typographyVariant.h1}>
                        {index + 1}.
                    </Typography>
                )}

                <Avatar size={avatarSize.medium} />

                <div className={element('text')}>
                    <Typography variant={typographyVariant.medium14}>
                        {title}
                    </Typography>
                    <p>{fullname}</p>
                </div>

                <div className={element('extra-content')}>
                    <div className={element('rating')}>
                        <Rating
                            reflect
                            scoreColor={ratingScoreColor.white}
                            size={ratingSize.medium}
                            systemColor={ratingSystemColor.primary500}
                            rating={rating}
                        />
                    </div>

                    <div className={element('buttons')}>
                        <Button
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            title='Профиль'
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};
