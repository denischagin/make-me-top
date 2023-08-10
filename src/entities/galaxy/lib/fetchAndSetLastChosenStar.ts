import React from 'react';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULT_ERROR_MESSAGE } from '@entities/user/model/constants';

import { DEFAULT_CHOSEN_STAR } from '@entities/galaxy/model/constants';
import { ILastChosenStar } from '@entities/galaxy/model/types';

import { fetchSystemById } from '@entities/orbit/thunks/fetchSystemById';

import { FETCH_AND_SET_CHOSEN_STAR } from '@shared/constants/actions';

interface FetchAndSetLastChosenStarInterface {
    id: number | null,
    withDependencies?: boolean,
    setLastChosenStar: React.Dispatch<React.SetStateAction<ILastChosenStar>>;
}

export const fetchAndSetLastChosenStar = createAsyncThunk<void, FetchAndSetLastChosenStarInterface>(
    FETCH_AND_SET_CHOSEN_STAR,
    async ({
        id,
        withDependencies,
        setLastChosenStar,
    }) => {
        try {
            const data = await fetchSystemById({
                id,
                withDependencies,
            });

            setLastChosenStar({
                ...DEFAULT_CHOSEN_STAR,
                ...data,
            });
        }
        catch (error: any) {
            throw toast(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);