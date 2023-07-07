import { useAppSelector } from '@app/providers/store/hooks';

import { userInfoSelector } from '@entities/user/model/selectors';

import { BackgroundProfile } from '@shared/BackgroundProfile';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CompletedStars } from '@widgets/CompletedStars';
import { CurrentStarCard } from '@widgets/CurrentStarCard';
import { ExplorerUserInfo } from '@widgets/ExplorerUserInfo';
import { Header } from '@widgets/Header';
import { RatingCard } from '@widgets/RatingCard';
import { StarsList } from '@widgets/StarsList';

import { typographyVariant } from '@shared/Typography/interfaces';

import {
    STAR_INFO,
    TABS_LIST,
    USERS_LIST,
} from './model';

import './styles.scss';

export const Explorer = () => {
    const [block, element] = bem('explorer');

    const userInfo = useAppSelector(userInfoSelector);

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <div className={element('container', 'container p-0')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <ExplorerUserInfo />
                            <CurrentStarCard
                                starInfo={STAR_INFO}
                                tabsList={TABS_LIST}
                            />
                            <StarsList heading='Освоенные звёзды' />
                        </div>
                        <div className={element('rating', 'col-xxl-3')}>
                            <RatingCard
                                list={USERS_LIST}
                                user={userInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
