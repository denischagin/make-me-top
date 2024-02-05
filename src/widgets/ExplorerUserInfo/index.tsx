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
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { Stack } from '@shared/ui/Stack';
import { stackAlign, stackSpacing } from '@shared/ui/Stack/interface';
import { useState } from 'react';
import { ShowUserInfo, ShowUserInfoButton, ShowUserInfoModal } from '@features/show-user-info';


export const ExplorerUserInfo = () => {
    const [block, element] = bem('explorer-user-info');

    const { data: userInfo, isSuccess } = useGetExplorerProfileQuery();
    const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);

    const handleToggleShowMore = () => {
        setIsShowMoreInfo((prev) => !prev);
    };

    if (!isSuccess) return null;

    const { person, totalSystems, rating } = userInfo;

    return (
        <>
            <Stack align={stackAlign.left} spacing={stackSpacing.large}>
                <div className={block()}>
                    <Avatar size={avatarSize.large} orbit />
                    <div className={element('description')}>
                        <Typography
                            as='h1'
                            variant={typographyVariant.h1}
                            className={element('description-name', 'mb-2')}
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

                        <ShowUserInfo {...userInfo?.person} fullname={getUserFullName(userInfo?.person)}>
                            <ShowUserInfoModal />

                            <ShowUserInfoButton title={'Подробнее'} size={buttonSize.small} />`
                        </ShowUserInfo>
                    </div>

                </div>
            </Stack>

            {/*<Modal onClose={handleToggleShowMore} isOpen={isShowMoreInfo}>*/}
            {/*    <Stack spacing={stackSpacing.large}>*/}
            {/*        <Typography as='h2' color={typographyColor.black}>Бэкэндов Зенька Sкролович:</Typography>*/}

            {/*        <div className={blockModalInfo()}>*/}
            {/*            <Typography className={elementModalInfo('item')} color={typographyColor.black} as='a'*/}
            {/*                        href={`tel:+79536510450`} underline={false}>*/}
            {/*                <PhoneIcon className={elementModalInfo('icon')} />&nbsp; +7953ФЫВАФЫВА*/}
            {/*            </Typography>*/}

            {/*            <Typography className={elementModalInfo('item')} color={typographyColor.black} as='a'*/}
            {/*                        href={`mailto:${'denischaginnn@gmail.com'}`}*/}
            {/*                        underline={false}>*/}
            {/*                <EmailIcon className={elementModalInfo('icon')} />&nbsp; +7953ФЫВАФЫВА*/}
            {/*            </Typography>*/}

            {/*            <Typography className={elementModalInfo('item')} color={typographyColor.black} as='a'*/}
            {/*                        href={`https://t.me/${'cheek_react'}`}*/}
            {/*                        underline={false}>*/}
            {/*                <TelegramIcon className={elementModalInfo('icon')} />&nbsp; +7953ФЫВАФЫВА*/}
            {/*            </Typography>*/}

            {/*            <Typography className={elementModalInfo('item')} color={typographyColor.black} as='a'*/}
            {/*                        href={`skype:${'live:745907042ee0eb26'}?chat`}*/}
            {/*                        underline={false}>*/}
            {/*                <SkypeIcon className={elementModalInfo('icon')} /> &nbsp; +7953ФЫВАФЫВА*/}
            {/*            </Typography>*/}
            {/*        </div>*/}
            {/*    </Stack>*/}

            {/*</Modal>*/}
        </>
    );
};
