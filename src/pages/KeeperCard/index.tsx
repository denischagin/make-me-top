import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header';
import { KeeperCardUserInfo } from '@widgets/KeeperCardUserInfo';
import { Reviews } from '@widgets/Reviews';
import { SystemsList } from '@widgets/SystemsList';

import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';

import './styles.scss';
import Spinner from '@shared/ui/Spinner';
import NotFound from '@pages/NotFound';
import { useGetKeeperCardInfoQuery } from '@entities/keeper/api/api';

const KeeperCard = () => {
    const [block, element] = bem('keeper-card');

    const navigate = useNavigate();

    const { personId } = useParams();

    const {
        data: userInfo,
        isSuccess,
        isError,
    } = useGetKeeperCardInfoQuery(Number(personId));

    if (isError) return <NotFound />;
    if (!isSuccess) return <Spinner />;

    const { systems } = userInfo;
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

                <Reviews reviews={userInfo} />
            </Container>
        </div>
    );
};

export default KeeperCard;
