import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { keeperCardInfoSelector } from '@entities/keeper/model/selectors';
import { getKeeperCardInfo } from '@entities/keeper/thunks/getKeeperCardInfo';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';
import { KeeperCardUserInfo } from '@widgets/KeeperCardUserInfo';
import { Reviews } from '@widgets/Reviews';
import { StarsList } from '@widgets/StarsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';

import './styles.scss';

export const KeeperCard = () => {
    const [block, element] = bem('keeper-card');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(keeperCardInfoSelector);

    const {
        systems,
    } = userInfo;

    const {
        keeperId,
    } = useParams();

    useEffect(() => {
        dispatch(getKeeperCardInfo({
            keeperId: Number(keeperId),
        }));
    }, [keeperId]);

    return (
        <div className={block()}>
            <BackgroundProfile />
            <Header />
            <div className={element('container', 'container p-0')}>
                <div className={element('profile')}>
                    <div className={element('back-arrow')}>
                        <ArrowButton
                            onClick={() => navigate(-1)}
                            direction={arrowButtonDirection.left}
                        />
                    </div>
                    <KeeperCardUserInfo />
                </div>
                <StarsList
                    heading='Звезды исследователя'
                    stars={systems}
                />
                <Reviews />
            </div>
        </div>
    );
};
