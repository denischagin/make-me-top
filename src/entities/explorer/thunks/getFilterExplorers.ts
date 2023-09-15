import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ExplorersFilterInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_EXPLORER_LIST } from '../model/actions';
import { DEFAULT_ERROR_MESSAGE } from '../model/constants';

export interface ExplorerFilterResponseInterface extends ExplorersFilterInterface, ErrorInterface {

}

export const getListExplorersByFilter = createAsyncThunk<ExplorerFilterResponseInterface[], any, { rejectValue: ErrorInterface }>(
    FETCH_EXPLORER_LIST,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                data,
            } = await instance.get<ExplorerFilterResponseInterface[]>(`${URL_MMT_STAND}info/explorer/`);

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
