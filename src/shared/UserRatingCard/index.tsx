import { Card } from '@shared/Card'
import { cardSize } from '@shared/Card/interfaces'
import { typographyVariant } from '@shared/Typography/interfaces'
import { bem } from '@shared/utils/bem'
import React from 'react'
import { UserRatingCardProps } from './interface'
import { Typography } from '@shared/Typography'
import { Avatar } from '@shared/Avatar'
import { avatarSize } from '@shared/Avatar/interfaces'
import { Rating } from '@shared/Rating'
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/Rating/interfaces'
import { Button } from '@shared/Button'
import { buttonColor, buttonSize } from '@shared/Button/interfaces'
import "./style.scss"

export const UserRatingCard = (props: UserRatingCardProps) => {
    const { 
        fullname, 
        index, 
        onClick, 
        rating, 
        title 
    } = props
    const [block, element] = bem('user-rating')

    return (
        <div className={block()} onClick={onClick}>
            <Card size={cardSize.large} glow    >
                { index !== undefined && <Typography variant={typographyVariant.h1}>{index + 1}.</Typography> }

                <Avatar size={avatarSize.medium} />

                <div className={element('text')}>
                    <Typography variant={typographyVariant.medium14}>{title}</Typography>
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
                            title="Профиль"
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}
