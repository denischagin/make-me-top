import { InfoCard } from '@shared/ui/InfoCard';
import { Rating } from '@shared/ui/Rating';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { ratingScoreColor, ratingSize, ratingSystemColor } from '@shared/ui/Rating/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { ShowUserInfo, ShowUserInfoButton, ShowUserInfoModal } from '@features/show-user-info';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { LoadAvatarImage } from '@features/load-avatar';

export const KeeperUserInfo = () => {
    const [block, element] = bem('keeper-user-info');

    const { data: userInfo, isSuccess } = useGetKeeperProfileQuery();

    if (!isSuccess) return null;

    const {
        person,
        rating,
        totalExplorers,
        totalSystems,
    } = userInfo;

    return (
        <div className={block()}>
            <LoadAvatarImage orbit personId={person.personId} />

            <div className={element('description')}>
                <Typography
                    as='h1'
                    className={element('description-name', 'mb-4')}
                    variant={typographyVariant.h1}
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
                    <InfoCard title='Кол-во систем' value={totalSystems} />
                    <InfoCard
                        title='Всего исследователей'
                        value={totalExplorers}
                    />
                    <InfoCard
                        title='Макс. кол-во исследователей'
                        value={person.maxExplorers}
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
