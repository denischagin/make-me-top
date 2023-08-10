import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';
import {
    TOAST_LOADING_GALAXIES,
    TOAST_SUCCESS_LOGIN,
} from '@shared/constants/toasts';
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
        const toastLoading = toast.loading(TOAST_LOADING_GALAXIES);

        try {
            const {
                data,
            } = await axios.post<ErrorInterface>(`${URL_MMT_STAND}auth/login`, payload);

            localStorage.setItem(storageKeys.tokenAuth, JSON.stringify(data));

            callback();

            toast.success(TOAST_SUCCESS_LOGIN, {
                id: toastLoading,
                duration: 1500,
            });

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            if (error.response) {
                throw toast.error(error.response.data.errorMessage, {
                    id: toastLoading,
                });
            }

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE, {
                id: toastLoading,
            });
        }
    },
);