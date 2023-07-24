import { useEffect } from 'react';
import { useParams } from 'react-router';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { explorerCardInfoSelector } from '@entities/explorer/model/selectors';
import { getExplorerCardInfo } from '@entities/explorer/thunks/getExplorerCardInfo';

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

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        investigatedSystems,
    } = userInfo;

    const {
        explorerId,
    } = useParams();

    useEffect(() => {
        dispatch(getExplorerCardInfo({
            explorerId: Number(explorerId),
        }));
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
                    <StarsList
                        heading='Освоенные звёзды'
                        stars={investigatedSystems}
                    />
                    <Reviews />
                </div>
            </div>
        </div>
    );
};
