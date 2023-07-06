import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FETCH_USER } from '@entities/user/model/actions';
import {
    PostUser,
    UserProgress,
} from '@entities/user/model/types';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_USER } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';


export interface UserResponseInterface extends UserProgress, ErrorInterface {}

export const getUser = createAsyncThunk(
    FETCH_USER,
    async (payload: PostUser, {
        rejectWithValue,
    }) => {
        try {
            const {
                username,
            } = payload;

            const {
                data,
            } = await instance.get<UserResponseInterface>(`${URL_MMT_STAND_USER}user`);

            if (data.message) {
                toast.error(data.message);

                return rejectWithValue(data);
            }

            return data;
        } catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);