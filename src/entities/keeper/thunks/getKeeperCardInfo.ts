import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { KeeperCardInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_KEEPER_CARD } from '../model/actions';


export interface KeeperIdInterface {
    keeperId: number;
}

export interface KeeperCardInfoResponseInterface
    extends KeeperCardInfoInterface,
        ErrorInterface {}

export const getKeeperCardInfo = createAsyncThunk<
    KeeperCardInfoResponseInterface,
    KeeperIdInterface,
    { rejectValue: ErrorInterface }
>(FETCH_KEEPER_CARD, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            keeperId,
        } = payload;

        const {
            data,
        } = await instance.get<KeeperCardInfoResponseInterface>(
            `${URL_MMT_STAND}info/keeper/${keeperId}`,
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
