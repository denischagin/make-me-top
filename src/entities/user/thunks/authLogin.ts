import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND_AUTHORIZATION } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_AUTH } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';
import { AuthLoginInterface } from '../model/types';

export const authLogin = createAsyncThunk<ErrorInterface, AuthLoginInterface, { rejectValue: ErrorInterface }>(
    FETCH_AUTH,
    async ({
        payload,
        callback,
    }, {
        rejectWithValue,
    }) => {
        try {
            const {
                data,
            } = await axios.post<ErrorInterface>(`${URL_MMT_STAND_AUTHORIZATION}auth/login`, payload);

            if (data.message) {
                toast.error(data.message);

                return rejectWithValue(data);
            }

            localStorage.setItem(storageKeys.tokenAuth, JSON.stringify(data));
            callback();

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);