import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ExplorerCardInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_EXPLORER_CARD } from '../model/actions';
import { onErrorHandler } from '@shared/api';

export interface ExplorerIdInterface {
    personId: number;
}

export interface ExplorerCardInfoResponseInterface
    extends ExplorerCardInfoInterface,
        ErrorInterface {}

export const getExplorerCardInfo = createAsyncThunk<
    ExplorerCardInfoResponseInterface,
    ExplorerIdInterface,
    { rejectValue: ErrorInterface }
>(FETCH_EXPLORER_CARD, async (payload, { rejectWithValue }) => {
    try {
        const { personId } = payload;

        const { data } = await instance.get<ExplorerCardInfoResponseInterface>(
            `${URL_MMT_STAND}person-app/people/${personId}`,
            {
                params: {
                    as: 'explorer',
                },
            },
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
