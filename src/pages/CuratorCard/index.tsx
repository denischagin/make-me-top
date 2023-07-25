import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { keeperCardInfoSelector } from '@entities/curator/model/selectors';
import { getKeeperCardInfo } from '@entities/curator/thunks/getKeeperCardInfo';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';
import { RouterLink } from '@shared/RouterLink';

import { bem } from '@shared/utils/bem';

import { URL_CURATOR } from '@shared/constants/links';

import { CuratorCardUserInfo } from '@widgets/CuratorCardUserInfo';
import { Header } from '@widgets/Header';
import { Reviews } from '@widgets/Reviews';
import { StarsList } from '@widgets/StarsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';

import './styles.scss';

export const CuratorCard = () => {
    const [block, element] = bem('curator-card');

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
                    <CuratorCardUserInfo />
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
