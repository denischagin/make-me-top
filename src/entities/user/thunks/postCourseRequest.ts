import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import {
    FETCH_AUTH,
    POST_COURSE_REQUEST,
} from '@entities/user/model/actions';
import { DEFAULT_ERROR_MESSAGE } from '@entities/user/model/constants';

import { URL_MMT_STAND_USER_PROGRESS } from '@shared/constants/urls';

import {
    ErrorInterface,
    PostCourseInterface,
} from '@shared/types/common';

export const postCourseRequest = createAsyncThunk<ErrorInterface, PostCourseInterface, { rejectValue: ErrorInterface }>(
    FETCH_AUTH,
    async ({
        payload,
    }, {
        rejectWithValue,
    }) => {
        try {
            const {
                data,
            } = await axios.post<ErrorInterface>(`${URL_MMT_STAND_USER_PROGRESS}explorer-cabinet/course-request`, payload);

            return data;
        }
        catch (err) {
            const error: AxiosError<ErrorInterface> = err as any;

            if (error.response) {
                throw toast.error(error.response.data.errorMessage);
            }

            throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
        }
    },
);