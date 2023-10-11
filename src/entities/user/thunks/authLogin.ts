import { createAsyncThunk } from '@reduxjs/toolkit';

import { onErrorHandler } from '@shared/api';
import { storageKeys } from '@shared/constants/storageKeys';

import { FETCH_AUTH } from '../model/actions';
import { AuthLoginInterface } from '../model/types';
import { instance } from '@shared/api/instances';
import axios from 'axios';
import { URL_MMT_STAND } from '@shared/constants/urls';
import { AuthResponse } from '@entities/viewer/model/types/api';

export const authLogin = createAsyncThunk<AuthResponse, AuthLoginInterface>(
    FETCH_AUTH,
    async ({ payload, callback }) => {
        try {
            const { data } = await axios.post<AuthResponse>(
                `${URL_MMT_STAND}auth/login/`,
                payload,
                { withCredentials: true },
            );

            localStorage.setItem(
                storageKeys.accessToken,
                data.accessToken.accessToken,
            );

            localStorage.setItem(
                storageKeys.refreshToken,
                data.refreshToken.refreshToken,
            );

            // if (payload.role === 'EXPLORER')
            //     localStorage.setItem(
            //         storageKeys.currentRole,
            //         'EXPLORER' as roles,
            //     );
            // else if (payload.role === 'KEEPER')
            //     localStorage.setItem(
            //         storageKeys.currentRole,
            //         'KEEPER' as roles,
            //     );

            callback();

            return data;
        } catch (err) {
            throw onErrorHandler({
                err,
            });
        }
    },
);
