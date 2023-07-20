import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';
import { ExplorerApplicationCard } from '@shared/ExplorerApplicationCard';

import { bem } from '@shared/utils/bem';

import { ExplorerCardUserInfo } from '@widgets/ExplorerCardUserInfo';
import { Header } from '@widgets/Header';
import { Reviews } from '@widgets/Reviews';
import { StarsList } from '@widgets/StarsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';

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
                    <ExplorerApplicationCard />
                    <StarsList heading='Освоенные звёзды' />
                    <Reviews />
                </div>
            </div>
        </div>
    );
};
