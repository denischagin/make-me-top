import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FETCH_USER_PROGRESS_IN_GALAXY } from '@entities/galaxy/model/actions';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import {
    DEFAULT_ERROR_MESSAGE,
} from '../model/constants';
import { UserProgressInGalaxy } from '../model/types';

interface GetUserProgressInGalaxy {
    galaxyId: number
}

export interface GetUserProgressInGalaxyResponse extends UserProgressInGalaxy, ErrorInterface {
}

export const getUserProgressInGalaxy = createAsyncThunk<GetUserProgressInGalaxyResponse, GetUserProgressInGalaxy, { rejectValue: ErrorInterface }>(
    FETCH_USER_PROGRESS_IN_GALAXY,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                galaxyId,
            } = payload;

            const {
                data,
            } = await instance.get<GetUserProgressInGalaxyResponse>(`${URL_MMT_STAND}explorer-cabinet/galaxy/${galaxyId}`);

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