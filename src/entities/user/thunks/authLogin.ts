import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { roles, storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_AUTH } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';
import { AuthLoginInterface } from '../model/types';

export const authLogin = createAsyncThunk<ErrorInterface, AuthLoginInterface>(
    FETCH_AUTH,
    async ({
        payload,
        callback,
    }) => {
        try {
            const {
                data,
            } = await axios.post<ErrorInterface>(`${URL_MMT_STAND}auth/login`, payload);

            localStorage.setItem(storageKeys.tokenAuth, JSON.stringify(data));

            if (payload.role === "EXPLORER")
                localStorage.setItem(storageKeys.currentRole, "EXPLORER" as roles)

            else if (payload.role === "KEEPER")
                localStorage.setItem(storageKeys.currentRole, "KEEPER" as roles)

            callback();


            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            if (error.response) {
                throw toast.error(error.response.data.errorMessage);
            }

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);