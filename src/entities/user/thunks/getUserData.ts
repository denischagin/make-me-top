import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_USER } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_USER_INFO } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';
import { UserDataInterface } from '../model/types';

export interface UserDataResponseInterface extends UserDataInterface, ErrorInterface {

}

export const getUserData = createAsyncThunk<UserDataResponseInterface, any, { rejectValue: ErrorInterface }>(
    FETCH_USER_INFO,
    async (payload, {
        rejectWithValue,
    }) => {
        try {

            const {
                data,
            } = await instance.get<UserDataResponseInterface>(`${URL_MMT_STAND_USER}info/`);

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
