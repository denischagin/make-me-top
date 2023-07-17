import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FETCH_GALAXY } from '@entities/galaxy/model/actions';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_GALAXY } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_GALAXY_ID,
} from '../model/constants';
import { GalaxyType } from '../model/types';

interface GetGalaxyInterface {
    galaxyId: number
}

export interface GalaxyResponseInterface extends GalaxyType, ErrorInterface {}

export const getGalaxy = createAsyncThunk<GalaxyResponseInterface, GetGalaxyInterface, { rejectValue: ErrorInterface }>(
    FETCH_GALAXY,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                galaxyId = DEFAULT_GALAXY_ID,
            } = payload;

            const {
                data,
            } = await instance.get<GalaxyResponseInterface>(`${URL_MMT_STAND_GALAXY}galaxy-app/galaxy/${galaxyId}`);

            if (data.message) {
                toast.error(data.message);

                return rejectWithValue(data);
            }

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);