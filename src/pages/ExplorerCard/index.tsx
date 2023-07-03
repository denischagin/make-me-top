import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';
import { ExplorerApplicationCard } from '@shared/ExplorerApplicationCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CuratorStars } from '@widgets/CuratorStars';
import { ExplorerCardUserInfo } from '@widgets/ExplorerCardUserInfo';
import { Header } from '@widgets/Header';
import { Reviews } from '@widgets/Reviews';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ExplorerCard = () => {
    const [block, element] = bem('explorer-card');

    const {
        explorerId,
    } = useParams();

    useEffect(() => {
        // Тут будет вызываться метод запроса
        // getCuratorData(curatorId);
    }, [explorerId]);

    return (
        <div className={block()}>
            <BackgroundProfile />
            <Header />
            <div className={element('container', 'container p-0')}>
                <div className={element('profile')}>
                    <div className={element('back-arrow')}>
                        <ArrowButton direction={arrowButtonDirection.left} />
                    </div>
                    <ExplorerCardUserInfo />
                </div>
                <div className={element('content', 'mt-5')}>
                    <div className={element('application')}>
                        <Typography
                            className={element('heading', 'mb-4')}
                            variant={typographyVariant.h2}
                        >
                            Текущая звезда:
                        </Typography>
                        <ExplorerApplicationCard />
                    </div>
                    <div className={element('stars')}>
                        <Typography
                            className={element('heading', 'mt-5 mb-4')}
                            variant={typographyVariant.h2}
                        >
                            Освоенные звёзды
                        </Typography>
                        <CuratorStars />
                    </div>
                    <Reviews />
                </div>
            </div>
        </div>
    );
};
