import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { CuratorCardUserInfo } from '@widgets/CuratorCardUserInfo';
import { Header } from '@widgets/Header';
import { Reviews } from '@widgets/Reviews';
import { StarsList } from '@widgets/StarsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const CuratorCard = () => {
    const [block, element] = bem('curator-card');

    const {
        curatorId,
    } = useParams();

    useEffect(() => {
        // Тут будет вызываться метод запроса
        // getCuratorData(curatorId);
    }, [curatorId]);

    return (
        <div className={block()}>
            <BackgroundProfile />
            <Header />
            <div className={element('container', 'container p-0')}>
                <div className={element('profile')}>
                    <div className={element('back-arrow')}>
                        <ArrowButton direction={arrowButtonDirection.left} />
                    </div>
                    <CuratorCardUserInfo />
                </div>
                <StarsList heading='Звезды исследователя' />
                <Reviews />
            </div>
        </div>
    );
};
