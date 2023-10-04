import { createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_GALAXY } from '@entities/galaxy/model/actions';

import { onErrorHandler } from '@shared/api';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import {
    DEFAULT_GALAXY_ID,
} from '../model/constants';
import { GalaxyState } from '../model/types';


interface GetGalaxyInterface {
    galaxyId: number;
}

export interface GalaxyResponseInterface extends GalaxyState, ErrorInterface {}

export const getGalaxy = createAsyncThunk<
    GalaxyResponseInterface,
    GetGalaxyInterface,
    { rejectValue: ErrorInterface }
>(FETCH_GALAXY, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            galaxyId = DEFAULT_GALAXY_ID,
        } = payload;

        const {
            data,
        } = await instance.get<GalaxyResponseInterface>(
            `${URL_MMT_STAND}galaxy-app/galaxy/${galaxyId}`,
        );

        return data;
    } catch (err) {
        return rejectWithValue(
            onErrorHandler({
                err,
            }),
        );
    }
});
