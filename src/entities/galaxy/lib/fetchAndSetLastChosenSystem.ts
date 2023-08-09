import React from 'react';

import { DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE } from '@entities/galaxy/model/constants';
import { LastChosenSystem } from '@entities/galaxy/model/types';

import { fetchSystemById } from '@entities/orbit/thunks/fetchSystemById';

interface FetchAndSetLastChosenSystem {
    id: number | null,
    withDependencies?: boolean,
    setState: React.Dispatch<React.SetStateAction<LastChosenSystem>>;
}

export const fetchAndSetLastChosenSystem = async (params: FetchAndSetLastChosenSystem) => {
    const {
        id,
        withDependencies,
        setState,
    } = params;

    const data = await fetchSystemById({
        id,
        withDependencies,
    });

    setState({
        ...DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
        ...data,
    });
};