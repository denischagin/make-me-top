import { Avatar } from '@shared/ui/Avatar';
import { InfoCard } from '@shared/ui/InfoCard';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';

export const ExplorerUserInfo = () => {
    const [block, element] = bem('explorer-user-info');

    const { data: userInfo, isSuccess } = useGetExplorerProfileQuery();

    if (!isSuccess) return null;

    const { person, totalSystems, rating } = userInfo;

    return (
        <div className={block()}>
            <Avatar size={avatarSize.large} orbit />
            <div className={element('description')}>
                <Typography
                    variant={typographyVariant.h1}
                    className={element('description-name', 'mb-4')}
                >
                    {getUserFullName(person)}
                </Typography>
                <div className={element('cards')}>
                    <InfoCard
                        title='Рейтинг'
                        value={
                            <Rating
                                scoreColor={ratingScoreColor.white}
                                rating={rating}
                                size={ratingSize.large}
                                systemColor={ratingSystemColor.primary500}
                            />
                        }
                    />
                    <InfoCard
                        title='Кол-во систем'
                        value={totalSystems}
                    />
                </div>
            </div>
        </div>
    );
};
