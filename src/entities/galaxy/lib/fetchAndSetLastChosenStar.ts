import React from 'react';

import { DEFAULT_CHOSEN_STAR } from '@entities/galaxy/model/constants';
import { ILastChosenStar } from '@entities/galaxy/model/types';

import { fetchSystemById } from '@entities/orbit/thunks/fetchSystemById';

interface FetchAndSetLastChosenStar {
    id: number | null,
    withDependencies?: boolean,
    setState: React.Dispatch<React.SetStateAction<ILastChosenStar>>;
}

export const fetchAndSetLastChosenStar = async (params: FetchAndSetLastChosenStar) => {
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
        ...DEFAULT_CHOSEN_STAR,
        ...data,
    });
};