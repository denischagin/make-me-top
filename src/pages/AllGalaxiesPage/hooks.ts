import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { GalaxyForGetAll } from '@entities/galaxy/model/types';

import { CurrentGalaxyInterface } from './interface';

export const useCurrentGalaxy = (galaxies: GalaxyForGetAll[]) => {
    const [currentGalaxy, setCurrentGalaxy] =
        useState<CurrentGalaxyInterface | null>(null);

    useEffect(() => {
        if (galaxies.length > 0 && currentGalaxy === null) {
            setCurrentGalaxy({
                ...galaxies[0],
                index: 0,
            });
        }
    }, [galaxies, currentGalaxy]);

    const isFirstGalaxy = currentGalaxy?.index === 0;
    const isLastGalaxy = currentGalaxy?.index === galaxies.length - 1;

    const lastGalaxy = galaxies[galaxies.length - 1];
    const firstGalaxy = galaxies[0];

    const prevGalaxyIndex = currentGalaxy?.index ?? 0 - 1;
    const nextGalaxyIndex = currentGalaxy?.index ?? 0 + 1;

    const prevGalaxy = currentGalaxy
        ? galaxies[currentGalaxy.index - 1]
        : galaxies[0];

    const nextGalaxy = currentGalaxy
        ? galaxies[currentGalaxy.index + 1]
        : galaxies[0];

    const circlePrevGalaxyName = isFirstGalaxy
        ? lastGalaxy.galaxyName
        : prevGalaxy?.galaxyName;

    const circleNextGalaxyName = isLastGalaxy
        ? firstGalaxy.galaxyName
        : nextGalaxy?.galaxyName;

    const handleSwitchCurrentGalaxy = (index: number) => {
        setCurrentGalaxy({
            ...galaxies[index],
            index,
        });
    };

    const handlePrevGalaxy = useCallback(
        () =>
            handleSwitchCurrentGalaxy(
                isFirstGalaxy ? galaxies.length - 1 : prevGalaxyIndex,
            ),
        [handleSwitchCurrentGalaxy, isFirstGalaxy, galaxies, prevGalaxyIndex],
    );

    const handleNextGalaxy = useCallback(
        () => handleSwitchCurrentGalaxy(isLastGalaxy ? 0 : nextGalaxyIndex),
        [handleSwitchCurrentGalaxy, isLastGalaxy, galaxies, nextGalaxyIndex],
    );

    return {
        currentGalaxy,
        circleNextGalaxyName,
        circlePrevGalaxyName,
        handlePrevGalaxy,
        handleNextGalaxy,
    };
};
