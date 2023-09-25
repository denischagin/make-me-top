import { Card } from '@shared/ui/Card'
import { cardSize } from '@shared/ui/Card/interfaces'
import { typographyVariant } from '@shared/ui/Typography/interfaces'
import { bem } from '@shared/utils/bem'
import React from 'react'
import { UserRatingCardProps } from './interface'
import { Typography } from '@shared/ui/Typography'
import { Avatar } from '@shared/ui/Avatar'
import { avatarSize } from '@shared/ui/Avatar/interfaces'
import { Rating } from '@shared/ui/Rating'
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/ui/Rating/interfaces'
import { Button } from '@shared/ui/Button'
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces'
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
