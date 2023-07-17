import { useEffect } from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { getExplorerData } from '@entities/explorer/thunks/getExplorerData';

import { BackgroundProfile } from '@shared/BackgroundProfile';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CurrentStarCard } from '@widgets/CurrentStarCard';
import { ExplorerUserInfo } from '@widgets/ExplorerUserInfo';
import { Header } from '@widgets/Header';
import { RatingCard } from '@widgets/RatingCard';
import { StarsList } from '@widgets/StarsList';

import { typographyVariant } from '@shared/Typography/interfaces';

import { TABS_LIST } from './model';

import './styles.scss';

export const Explorer = () => {
    const [block, element] = bem('explorer');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getExplorerData({}));
    }, []);

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <div className={element('container', 'container p-0')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <ExplorerUserInfo />
                            <div className={element('current-star')}>
                                <Typography
                                    className={element('current-star-heading', 'mb-4 mt-5')}
                                    variant={typographyVariant.h2}
                                >
                                    Текущая звезда
                                </Typography>
                                <CurrentStarCard tabsList={TABS_LIST} />
                            </div>
                            <div className={element('completed-stars')}>
                                <StarsList heading='Освоенные звёзды' />
                            </div>
                        </div>
                        <div className={element('rating', 'col-xxl-3')}>
                            <Typography
                                variant={typographyVariant.h2}
                                className={element('rating-heading', 'mt-1 mb-4')}
                            >
                                Рейтинг
                            </Typography>
                            <RatingCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
