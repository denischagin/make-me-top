import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FETCH_GALAXY } from '@entities/galaxy/model/actions';

import { instance } from '@shared/api/instances';

import { TOAST_LOADING_GALAXIES } from '@shared/constants/toasts';
import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_GALAXY_ID,
} from '../model/constants';
import { GalaxyState } from '../model/types';

interface GetGalaxyInterface {
    galaxyId: number
}

export interface GalaxyResponseInterface extends GalaxyState, ErrorInterface {

}

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
            } = await instance.get<GalaxyResponseInterface>(`${URL_MMT_STAND}galaxy-app/galaxy/${galaxyId}`);

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            if (error.response) {
                toast.error(error.response.data.errorMessage);

                return rejectWithValue(error.response.data);
            }

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);