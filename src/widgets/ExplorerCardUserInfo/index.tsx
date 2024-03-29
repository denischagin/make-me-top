import { Avatar } from '@shared/ui/Avatar';
import { InfoCard } from '@shared/ui/InfoCard';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetExplorerCardInfoQuery } from '@entities/explorer/api/api';
import { useParams } from 'react-router-dom';
import { ShowUserInfo, ShowUserInfoButton, ShowUserInfoModal } from '@features/show-user-info';
import { buttonSize } from '@shared/ui/Button/interfaces';

export const ExplorerCardUserInfo = () => {
    const [block, element] = bem('explorer-card-user-info');

    const { personId } = useParams();

    const { data: userInfo, isSuccess } = useGetExplorerCardInfoQuery(
        Number(personId),
    );

    if (!isSuccess) return null;

    const { person, rating, totalSystems, totalFeedback } = userInfo;

    return (
        <div className={block()}>
            <Avatar size={avatarSize.large} orbit personId={userInfo.person.personId} type='NORMAL' />
            <div className={element('description')}>
                <div className={element('description-name', 'mb-4')}>
                    <Typography variant={typographyVariant.h1}>
                        {getUserFullName(person)}
                    </Typography>
                </div>

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

                    <InfoCard title='Отзывы' value={totalFeedback} />

                    <InfoCard
                        title='Кол-во систем'
                        value={totalSystems}
                    />
                </div>


                <ShowUserInfo {...userInfo?.person} fullname={getUserFullName(userInfo?.person)}>
                    <ShowUserInfoModal />

                    <ShowUserInfoButton title={'Подробнее'} size={buttonSize.small} />`
                </ShowUserInfo>
            </div>
        </div>
    );
};
