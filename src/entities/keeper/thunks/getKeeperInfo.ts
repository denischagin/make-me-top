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


export interface KeeperProfileResponseInterface
    extends KeeperInfoInterface,
        ErrorInterface {}

export const getKeeperInfo = createAsyncThunk<
    KeeperProfileResponseInterface,
    any,
    { rejectValue: ErrorInterface }
>(FETCH_KEEPER_INFO, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            data,
        } = await instance.get<KeeperProfileResponseInterface>(
            `${URL_MMT_STAND}person-app/people/keeper-profile`,
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
