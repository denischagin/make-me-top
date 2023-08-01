import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_USER } from '@shared/constants/urls';

import { KeeperCardInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_KEEPER_CARD } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';

export interface KeeperIdInterface {
    keeperId: number
}

export interface KeeperCardInfoResponseInterface extends KeeperCardInfoInterface, ErrorInterface {

}

export const getKeeperCardInfo = createAsyncThunk<KeeperCardInfoResponseInterface, KeeperIdInterface, { rejectValue: ErrorInterface }>(
    FETCH_KEEPER_CARD,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                keeperId,
            } = payload;

            const {
                data,
            } = await instance.get<KeeperCardInfoResponseInterface>(`${URL_MMT_STAND_USER}info/keeper/${keeperId}`);

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
