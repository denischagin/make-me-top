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
import { SystemsList } from '@widgets/SystemsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';

import './styles.scss';
import { Container } from '@shared/Container';

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
            <Container className={element('container')}>
                <div className={element('profile')}>
                    <div className={element('back-arrow')}>
                        <ArrowButton
                            onClick={() => navigate(-1)}
                            direction={arrowButtonDirection.left}
                        />
                    </div>
                    <KeeperCardUserInfo />
                </div>
                <SystemsList
                    heading='Системы исследователя'
                    systems={systems}
                />
                <Reviews />
            </Container>
        </div>
    );
};
