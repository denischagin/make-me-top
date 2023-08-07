import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_PLANETS } from '../model/actions';
import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_ID,
} from '../model/constants';
import { ModalPlanetInterface } from '../model/types';

interface GetModalPlanetsInterface {
    planetId: number
}

export interface PlanetsResponseInterface extends Array<ModalPlanetInterface>, ErrorInterface {

}

export const getModalPlanets = createAsyncThunk<PlanetsResponseInterface, GetModalPlanetsInterface, { rejectValue: ErrorInterface }>(
    FETCH_PLANETS,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                planetId = DEFAULT_ID,
            } = payload;

            const {
                data,
            } = await instance.get<PlanetsResponseInterface>(`${URL_MMT_STAND}planet-app/system/${planetId}/planet`);

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
