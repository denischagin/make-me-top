import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_PLANET } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_PLANETS } from '../model/actions';
import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_PLANET_ID,
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
                planetId = DEFAULT_PLANET_ID,
            } = payload;

            const {
                data,
            } = await instance.get<PlanetsResponseInterface>(`${URL_MMT_STAND_PLANET}planet-app/system/${planetId}/planet`);

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