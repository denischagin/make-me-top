import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ExplorerInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_EXPLORER_INFO } from '../model/actions';
import { onErrorHandler } from '@shared/api';



export const getExplorerInfo = createAsyncThunk<
    any,
    any,
    { rejectValue: ErrorInterface }
>(FETCH_EXPLORER_INFO, async (payload, {
    rejectWithValue,
}) => {
    try {
        const {
            data,
        } = await instance.get<any>(
            `${URL_MMT_STAND}person-app/people/explorer-profile`,
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
