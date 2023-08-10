import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { explorerCardInfoSelector } from '@entities/explorer/model/selectors';
import { getExplorerCardInfo } from '@entities/explorer/thunks/getExplorerCardInfo';

import { ArrowButton } from '@shared/ArrowButton';
import { BackgroundProfile } from '@shared/BackgroundProfile';
import { EducationApplicationCard } from '@shared/EducationApplicationCard';
import { ExplorerApplicationCard } from '@shared/ExplorerApplicationCard';
import { ReviewRequestCard } from '@shared/ReviewRequestCard';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { ExplorerCardUserInfo } from '@widgets/ExplorerCardUserInfo';
import { Header } from '@widgets/Header';
import { Reviews } from '@widgets/Reviews';
import { StarsList } from '@widgets/StarsList';

import { arrowButtonDirection } from '@shared/ArrowButton/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ExplorerCard = () => {
    const [block, element] = bem('explorer-card');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerCardInfoSelector);

    const {
        investigatedSystems,
        studyRequest,
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
