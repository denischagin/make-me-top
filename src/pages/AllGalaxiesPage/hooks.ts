import { useCallback, useEffect, useState } from 'react';

import { GalaxyBaseInfo } from '@entities/galaxy/model/types';

import { CurrentGalaxyInterface } from './interface';
import { useSearchParams } from 'react-router-dom';
import { searchParamKeys } from '@shared/constants';

export interface ReturnUseCurrentGalaxy {
    currentGalaxy: CurrentGalaxyInterface | null;
    currentGalaxyIndex: number | null;
    circleNextGalaxyName: string;
    circlePrevGalaxyName: string;
    handlePrevGalaxy: () => void;
    handleNextGalaxy: () => void;
}

export const useCurrentGalaxy = (
    galaxies: GalaxyBaseInfo[] = [],
): ReturnUseCurrentGalaxy => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentGalaxyIndex, setCurrentGalaxyIndex] = useState<number | null>(null);

    const handleSwitchCurrentGalaxy = (index: number) => {
        setCurrentGalaxyIndex(index);
        setSearchParams({ [searchParamKeys.galaxyId]: galaxies[index].galaxyId.toString() });
    };


    useEffect(() => {
        const currentGalaxyId = searchParams.get(searchParamKeys.galaxyId);
        if (currentGalaxyId) {
            const galaxyIndex = galaxies.findIndex((galaxy) => galaxy.galaxyId === Number(currentGalaxyId));
            if (galaxies.length !== 0 && galaxyIndex === -1) {
                return handleSwitchCurrentGalaxy(0);
            }
            if (galaxies.length === 0) {
                setCurrentGalaxyIndex(null);
            }
            return setCurrentGalaxyIndex(galaxyIndex);
        }

        if (galaxies.length > 0 && currentGalaxyIndex === null) {
            handleSwitchCurrentGalaxy(0);
        }
    }, [galaxies, currentGalaxyIndex]);

    const isFirstGalaxy = currentGalaxyIndex === 0;

    const isLastGalaxy = currentGalaxyIndex === galaxies.length - 1;

    const lastGalaxy = galaxies[galaxies.length - 1];

    const firstGalaxy = galaxies[0];

    const prevGalaxyIndex =
        (Number(currentGalaxyIndex) + galaxies.length - 1) % galaxies.length;

    const nextGalaxyIndex =
        (Number(currentGalaxyIndex) + 1) % galaxies.length;

    const prevGalaxy = currentGalaxyIndex
        ? galaxies[currentGalaxyIndex - 1]
        : galaxies[0];

    const nextGalaxy = currentGalaxyIndex
        ? galaxies[currentGalaxyIndex + 1]
        : galaxies[0];

    const circlePrevGalaxyName = isFirstGalaxy
        ? lastGalaxy?.galaxyName
        : prevGalaxy?.galaxyName;

    const circleNextGalaxyName = isLastGalaxy
        ? firstGalaxy?.galaxyName
        : nextGalaxy?.galaxyName;

    const handlePrevGalaxy = useCallback(
        () => handleSwitchCurrentGalaxy(prevGalaxyIndex),
        [handleSwitchCurrentGalaxy, prevGalaxyIndex],
    );

    const handleNextGalaxy = useCallback(
        () => handleSwitchCurrentGalaxy(nextGalaxyIndex),
        [handleSwitchCurrentGalaxy, nextGalaxyIndex],
    );

    return {
        currentGalaxy: galaxies[currentGalaxyIndex ?? 0],
        currentGalaxyIndex,
        circleNextGalaxyName,
        circlePrevGalaxyName,
        handlePrevGalaxy,
        handleNextGalaxy,
    };
};
