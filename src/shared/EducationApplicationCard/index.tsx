import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { Rating } from '@shared/Rating';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { EducationApplicationCardInterface } from './interfaces';
import { avatarSize } from '@shared/Avatar/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingStarColor,
} from '@shared/Rating/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const EducationApplicationCard = (props: EducationApplicationCardInterface) => {
    const {
        user,
    } = props;

    const [block, element] = bem('application-education-card');

    return (
        <div className={block()}>
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar
                            image={user.avatar}
                            size={avatarSize.medium}
                        />
                        <div className={element('about')}>
                            <Typography variant={typographyVariant.regular14}>{`Звезда: ${user.planet}`}</Typography>
                            <Typography
                                className={element('user-name')}
                                variant={typographyVariant.medium16}
                            >
                                {user.name}
                            </Typography>
                        </div>
                    </div>
                    <div className={element('extra-content')}>
                        <div className={element('rating')}>
                            <Rating
                                starColor={ratingStarColor.primary500}
                                size={ratingSize.large}
                                scoreColor={ratingScoreColor.white}
                                rating={user.rating}
                                reflect
                            />
                        </div>
                        <div className={element('buttons')}>
                            <Button
                                title={'Отклонить'}
                                size={buttonSize.large}
                            />
                            <Button
                                title={'Принять'}
                                color={buttonColor.filled}
                                size={buttonSize.large}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
