import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_USER } from '@shared/constants/urls';

import { KeeperInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_KEEPER } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';

export interface KeeperInfoResponseInterface extends KeeperInfoInterface, ErrorInterface {

}

export const getKeeperData = createAsyncThunk<KeeperInfoResponseInterface, any, { rejectValue: ErrorInterface }>(
    FETCH_KEEPER,
    async (payload, {
        rejectWithValue,
    }) => {
        try {

            const {
                data,
            } = await instance.get<KeeperInfoResponseInterface>(`${URL_MMT_STAND_USER}info/`);

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
