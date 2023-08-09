import React from 'react';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';
import { SystemType } from '@entities/galaxy/model/types';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

export interface SystemResponseInterface extends SystemType, ErrorInterface {
}

export interface payloadInterface {
    id: number | null;
    withDependencies?: boolean;
}

export interface FetchSystemById {
    payload: payloadInterface
    callback?: () => void
    setState?:  React.Dispatch<React.SetStateAction<any>>
}

export const fetchSystemById = createAsyncThunk<ErrorInterface, FetchSystemById>(
    'FETCH_SYSTEM',
    async ({
        payload,
        callback,
        setState,
    }) => {
        try {
            const {
                id,
                withDependencies,
            } = payload;

            const fetchUrl = withDependencies
                ? `${URL_MMT_STAND}galaxy-app/system/${id}?withDependencies=true`
                : `${URL_MMT_STAND}galaxy-app/system/${id}`;

            const {
                data,
            } = await instance.get<SystemResponseInterface>(fetchUrl);

            if (callback) {
                callback();
            }

            if (setState) {
                setState(data);
            }

            console.log(data);

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface, any>;

            if (error.response) {
                throw toast.error(error.response.data.errorMessage);
            }

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);
