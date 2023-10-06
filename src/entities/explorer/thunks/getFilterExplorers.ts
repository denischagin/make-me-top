import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ExplorersFilterInterface } from '../model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_EXPLORER_LIST } from '../model/actions';

export interface ExplorerFilterResponseInterface
    extends ExplorersFilterInterface,
        ErrorInterface {}

export const getListExplorersByFilter = createAsyncThunk<
    ExplorerFilterResponseInterface[],
    any,
    { rejectValue: ErrorInterface }
>(FETCH_EXPLORER_LIST, async (payload, { rejectWithValue }) => {
    try {
        const { data } = await instance.get<ExplorerFilterResponseInterface[]>(
            `${URL_MMT_STAND}person-app/people`,
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
