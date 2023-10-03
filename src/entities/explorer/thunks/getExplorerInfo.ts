import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ExplorerInfoInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_EXPLORER_INFO } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';
import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

export interface ExplorerInfoResponseInterface
    extends ExplorerInfoInterface,
        ErrorInterface {}

export const getExplorerInfo = createAsyncThunk<
    ExplorerInfoResponseInterface,
    any,
    { rejectValue: ErrorInterface }
>(FETCH_EXPLORER_INFO, async (payload, { rejectWithValue }) => {
    try {
        const { data } = await instance.get<ExplorerInfoResponseInterface>(
            `${URL_MMT_STAND}explorer-cabinet/info/`,
        );

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        noAuthHandler(error);

        if (error.response) {
            toast.error(error.response.data.errorMessage);

            return rejectWithValue(error.response.data);
        }

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
});
