import React from 'react';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios/index';

import { DEFAULT_ERROR_MESSAGE } from '@entities/user/model/constants';

import { SystemDependencyType } from '@entities/galaxy/model/types';

import {
    fetchSystemById,
    SystemResponseInterface,
} from '@entities/orbit/thunks/fetchSystemById';

import { FETCH_AND_SET_ALL_DEPENDENCIES } from '@shared/constants/actions';

import { ErrorInterface } from '@shared/types/common';

interface FetchAndSetAllDependencies {
    list: Array<SystemDependencyType> | undefined;
    setFetchedSystemList: React.Dispatch<React.SetStateAction<Array<SystemResponseInterface>>>
}

export const fetchAndSetAllDependencies = createAsyncThunk<void, FetchAndSetAllDependencies>(
    FETCH_AND_SET_ALL_DEPENDENCIES,
    async ({
        list = [],
        setFetchedSystemList,
    }) => {
        try {
            const allData = await Promise.all(
                list.map((
                    {
                        systemId,
                    }) => fetchSystemById({
                    id: systemId,
                })),
            );

            return setFetchedSystemList(allData);
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);