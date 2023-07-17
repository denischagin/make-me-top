import { useAppSelector } from '@app/providers/store/hooks';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Card } from '@shared/Card';
import { DividingLine } from '@shared/DividingLine';
import { Typography } from '@shared/Typography';
import { UsersRating } from '@shared/UsersRating';

import { bem } from '@shared/utils/bem';

import { cardSize } from '@shared/Card/interfaces';
import { DividingLineColor } from '@shared/DividingLine/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const RatingCard = () => {
    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        ratingTable,
    } = userInfo;

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
                <UsersRating user={userInfo} />
                <DividingLine color={DividingLineColor.opacitygray} />
                <Typography
                    variant={typographyVariant.medium16}
                    className={element('heading', 'mb-4')}
                >
                    Общий рейтинг
                </Typography>
                {
                    ratingTable?.map((user) => (
                        <UsersRating
                            key={user}
                            user={userInfo}
                        />
                    ))
                }
            </div>
        </Card>
    );
};
