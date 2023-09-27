import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { Typography } from '@shared/ui/Typography';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { MasteringApplication } from '@entities/explorer';

import { loadingIsLoadingSelector } from '@entities/loading/model/selectors';

import {
    explorerInfoSelector,
    explorersIsErrorSelector,
} from '@entities/explorer/model/selectors';
import { getExplorerInfo } from '@entities/explorer/thunks/getExplorerInfo';

import { bem } from '@shared/utils/bem';

import { URL_GALAXY } from '@shared/constants/links';

import { CurrentSystemCard } from '@widgets/CurrentSystemCard';
import { ExplorerUserInfo } from '@widgets/ExplorerUserInfo';
import { Header } from '@widgets/Header';
import { RatingCard } from '@widgets/RatingCard';
import { SystemsList } from '@widgets/SystemsList';

import NotFound from '@pages/NotFound';

import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import { TABS_LIST } from './model';

import './styles.scss';

export const Explorer = () => {
    const [block, element] = bem('explorer');
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(explorerInfoSelector);
    const isError = useAppSelector(explorersIsErrorSelector);
    const isLoading = useAppSelector(loadingIsLoadingSelector);

    const {
        investigatedSystems,
        studyRequest,
        currentSystem,
    } = userInfo;

    useEffect(() => {
        dispatch(getExplorerInfo({}));
    }, []);

    if (isError) return <NotFound />;

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />(
                <Container className={element('container')}>
                    <div className={element('row', 'row')}>
                        <div className={element('profile', 'col-xxl-9')}>
                            <ExplorerUserInfo />

                            <div className={element('current-system')}>
                                <CurrentSystemCard tabsList={TABS_LIST} />
                                <MasteringApplication />
                            </div>

                            <div className={element('button-galaxy')}>
                                {(currentSystem || studyRequest) && (
                                    <Button
                                        title="Переход на страницу с галактикой"
                                        size={buttonSize.large}
                                        color={buttonColor.filled}
                                        onClick={() => navigate(URL_GALAXY + '/1')}
                                    />
                                )}
                            </div>

                            <div className={element('completed-systems')}>
                                <SystemsList
                                    heading="Освоенные системы"
                                    systems={investigatedSystems}
                                />
                            </div>
                        </div>

                        <div className={element('rating', 'col-xxl-3')}>
                            <Typography
                                variant={typographyVariant.h2}
                                className={element('rating-heading', 'mt-1 mb-4')}
                            >
                                Рейтинг
                            </Typography>
                            <RatingCard />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
