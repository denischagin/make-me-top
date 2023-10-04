import React from 'react';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE } from '@entities/galaxy/model/constants';
import { LastChosenSystem } from '@entities/galaxy/model/types';

import { fetchSystemById } from '@entities/orbit/thunks/fetchSystemById';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { FETCH_AND_SET_CHOSEN_SYSTEM } from '@shared/constants/actions';

import { ErrorInterface } from '@shared/types/common';
import { onErrorHandler } from '@shared/api';


interface FetchAndSetLastChosenStarInterface {
    id: number | null;
    withDependencies?: boolean;
    setLastChosenSystem: React.Dispatch<React.SetStateAction<LastChosenSystem>>;
}

export const fetchAndSetLastChosenSystem = createAsyncThunk<
    void,
    FetchAndSetLastChosenStarInterface
>(
    FETCH_AND_SET_CHOSEN_SYSTEM,
    async ({ id, withDependencies, setLastChosenSystem }) => {
        try {
            const data = await fetchSystemById({
                id,
                withDependencies,
            });

            return setLastChosenSystem({
                ...DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE,
                ...data,
            });
        } catch (err) {
            throw onErrorHandler({
                err,
            });
        }
    },
);
