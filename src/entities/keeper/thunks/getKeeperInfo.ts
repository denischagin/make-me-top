import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { KeeperInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_KEEPER_INFO } from '../model/actions';


export interface KeeperInfoResponseInterface
    extends KeeperInfoInterface,
        ErrorInterface {}

export const getKeeperInfo = createAsyncThunk<
    KeeperInfoResponseInterface,
    any,
    { rejectValue: ErrorInterface }
>(FETCH_KEEPER_INFO, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            data,
        } = await instance.get<KeeperInfoResponseInterface>(
            `${URL_MMT_STAND}keeper-cabinet/info/`,
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
