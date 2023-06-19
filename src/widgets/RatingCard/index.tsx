import { Card } from '@shared/Card';
import { DividingLine } from '@shared/DividingLine';
import { Typography } from '@shared/Typography';
import { UsersRating } from '@shared/UsersRating';

import { bem } from '@shared/utils/bem';

import { RatingCardInterface } from './interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { DividingLineColor } from '@shared/DividingLine/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import { UserInterface } from '@shared/types/common';

import './styles.scss';

export const RatingCard = (props: RatingCardInterface) => {
    const {
        list, user,
    } = props;

    const [block, element] = bem('rating-card');

    return (
        <Card size={cardSize.large}>
            <div className={block()}>
                <Typography
                    variant={typographyVariant.medium16}
                    className={element('heading', 'mb-4')}
                >
                    Мой рейтинг
                </Typography>
                <UsersRating user={user} />
                <DividingLine color={DividingLineColor.opacitygray} />
                <Typography
                    variant={typographyVariant.medium16}
                    className={element('heading', 'mb-4')}
                >
                    Общий рейтинг
                </Typography>
                {list.map((user: UserInterface) => (
                    <UsersRating
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </Card>
    );
};
