import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { BackgroundGalaxies } from '@shared/ui/BackgroundGalaxies';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { EntryAnimateGalaxies } from '@shared/ui/EntryAnimateGalaxies';
import { TitleGalaxyPage } from '@shared/ui/TitleGalaxyPage';
import { Typography } from '@shared/ui/Typography';

import { useGetAllGalaxiesQuery } from '@entities/galaxy/model/api';

import { bem } from '@shared/utils/bem';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { URL_GALAXY } from '@shared/constants/links';

import { ChangeGalaxyButtons } from '@widgets/ChangeGalaxyButtons';
import { GalaxyInformation } from '@widgets/GalaxyInformation';
import { GalaxyListStatistics } from '@widgets/GalaxyListStatistics';
import { Header } from '@widgets/Header';

import NotFound from '@pages/NotFound';

import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { useCurrentGalaxy } from './hooks';

import './style.scss';

const AllGalaxiesPage = () => {
    const {
        data: galaxies = [],
        isLoading,
        isError,
    } = useGetAllGalaxiesQuery();

    const {
        currentGalaxy,
        isFirstGalaxy,
        isLastGalaxy,
        lastGalaxy,
        firstGalaxy,
        prevGalaxyIndex,
        nextGalaxyIndex,
        prevGalaxy,
        nextGalaxy,
        handleSwitchCurrentGalaxy,
    } = useCurrentGalaxy(galaxies);

    const {
        limitElements: keepers,
        handleShowMore,
        handleHideAll,
        isLastLimit,
    } = useShowMore(currentGalaxy?.keepers ?? [], 9, 3);

    const [block, element] = bem('galaxies-page');

    const informationSectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const handleShowInformation = () =>
        informationSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

    const handleReturnToWelcome = () =>
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    if (isLoading)
        return (
            <div className={block()}>
                <BackgroundGalaxies />
                <Header />
            </div>
        );

    if (isError) return <NotFound errorCode="" />;

    return (
        <div className={block()}>
            <BackgroundGalaxies />
            <Header />
            <Container>
                <div className={element('content')}>
                    <EntryAnimateGalaxies
                        transition={{
                            duration: 1,
                        }}
                        className={element('title-wrapper')}
                    >
                        <TitleGalaxyPage galaxyName={currentGalaxy?.galaxyName ?? ''} />
                    </EntryAnimateGalaxies>

                    <ChangeGalaxyButtons
                        handlePrevGalaxy={() =>
                            handleSwitchCurrentGalaxy(
                                isFirstGalaxy ? galaxies.length - 1 : prevGalaxyIndex,
                            )
                        }
                        handleNextGalaxy={() =>
                            handleSwitchCurrentGalaxy(isLastGalaxy ? 0 : nextGalaxyIndex)
                        }
                        prevGalaxyName={
                            isFirstGalaxy ? lastGalaxy.galaxyName : prevGalaxy?.galaxyName
                        }
                        nextGalaxyName={
                            isLastGalaxy ? firstGalaxy.galaxyName : nextGalaxy?.galaxyName
                        }
                    />

                    <EntryAnimateGalaxies
                        transition={{
                            delay: 0.2,
                            duration: 1,
                        }}
                    >
                        <GalaxyListStatistics
                            explorerCount={currentGalaxy?.explorerCount}
                            keeperCount={currentGalaxy?.keeperCount}
                            systemCount={currentGalaxy?.systemCount}
                        />
                    </EntryAnimateGalaxies>

                    <EntryAnimateGalaxies
                        transition={{
                            delay: 0.3,
                            duration: 1,
                        }}
                    >
                        <Button
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            title="Перейти к системам"
                            onClick={() =>
                                navigate(URL_GALAXY + `/${currentGalaxy?.galaxyId}`)
                            }
                        />
                    </EntryAnimateGalaxies>

                    <EntryAnimateGalaxies
                        transition={{
                            delay: 0.4,
                            duration: 1,
                        }}
                        className={element('look-more')}
                    >
                        <Typography variant={typographyVariant.regular14}>
                            Информация о галактике
                        </Typography>
                        <ArrowButton
                            direction={arrowButtonDirection.bottom}
                            onClick={handleShowInformation}
                        />
                    </EntryAnimateGalaxies>

                    <section
                        className={element('information')}
                        ref={informationSectionRef}
                    >
                        <GalaxyInformation
                            galaxyDescription={currentGalaxy?.galaxyDescription}
                            keepers={keepers}
                            handleHideAll={handleHideAll}
                            handleShowMore={handleShowMore}
                            isLastLimit={isLastLimit}
                        />
                    </section>

                    <ArrowButton
                        direction={arrowButtonDirection.top}
                        onClick={handleReturnToWelcome}
                    />
                </div>
            </Container>
        </div>
    );
};

export default AllGalaxiesPage;