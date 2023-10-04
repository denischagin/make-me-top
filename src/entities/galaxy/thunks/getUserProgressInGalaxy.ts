import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FETCH_USER_PROGRESS_IN_GALAXY } from '@entities/galaxy/model/actions';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { UserProgressInGalaxy } from '../model/types';


interface GetUserProgressInGalaxy {
    galaxyId: number;
}

export interface GetUserProgressInGalaxyResponse
    extends UserProgressInGalaxy,
        ErrorInterface {}

export const getUserProgressInGalaxy = createAsyncThunk<
    GetUserProgressInGalaxyResponse,
    GetUserProgressInGalaxy,
    { rejectValue: ErrorInterface }
>(FETCH_USER_PROGRESS_IN_GALAXY, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            galaxyId,
        } = payload;

        const {
            data,
        } = await instance.get<GetUserProgressInGalaxyResponse>(
            `${URL_MMT_STAND}explorer-cabinet/galaxy/${galaxyId}`,
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
