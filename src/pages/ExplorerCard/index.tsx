import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';
import { ExplorerApplicationCard } from '@shared/ui/ExplorerApplicationCard';
import { ReviewRequestCard } from '@shared/ui/ReviewRequestCard';

import { bem } from '@shared/utils/helpers/bem';

import { ExplorerCardUserInfo } from '@widgets/ExplorerCardUserInfo';
import { Header } from '@widgets/Header/ui/Header';
import { Reviews } from '@widgets/Reviews';
import { SystemsList } from '@widgets/SystemsList';

import NotFound from '@pages/NotFound';

import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';

import './styles.scss';
import { useGetExplorerCardInfoQuery } from '@entities/explorer/api/api';
import Spinner from '@shared/ui/Spinner';

const ExplorerCard = () => {
    const [block, element] = bem('explorer-card');

    const navigate = useNavigate();
    const { personId } = useParams();

    const {
        data: userInfo,
        isSuccess,
        isError,
        isFetching,
    } = useGetExplorerCardInfoQuery(Number(personId));

    if (isError) return <NotFound />;
    if (!isSuccess) return <Spinner loading />;

    const { investigatedSystems } = userInfo;

    return (
        <div className={block()}>
            <BackgroundProfile />
            <Header />
            <Container className={element('container')}>
                { isFetching && <Spinner loading />}
                <div className={element('profile')}>
                    <div className={element('back-arrow')}>
                        <ArrowButton
                            onClick={() => navigate(-1)}
                            direction={arrowButtonDirection.left}
                        />
                    </div>
                    <ExplorerCardUserInfo />
                </div>
                <div className={element('content', 'mt-5')}>
                    <ReviewRequestCard />
                    <ExplorerApplicationCard />
                    <SystemsList
                        heading='Освоенные системы'
                        systems={investigatedSystems}
                    />
                    <Reviews reviews={userInfo} />
                </div>
            </Container>
        </div>
    );
};

export default ExplorerCard;
