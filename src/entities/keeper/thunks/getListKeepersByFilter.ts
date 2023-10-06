import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { KeepersFilterInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_KEEPER_LIST } from '../model/actions';
import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';
import { onErrorHandler } from '@shared/api';


export interface KeeperFilterResponseInterface
    extends KeepersFilterInterface,
        ErrorInterface {}

export const getListKeepersByFilter = createAsyncThunk<
    KeeperFilterResponseInterface[],
    any,
    { rejectValue: ErrorInterface }
>(FETCH_KEEPER_LIST, async (payload, { rejectWithValue }) => {
    try {
        const { data } = await instance.get<KeeperFilterResponseInterface[]>(
            `${URL_MMT_STAND}person-app/people`,
            { params: {
                as: "keeper"
            }}
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
