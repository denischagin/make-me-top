import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { POST_COURSE_REQUEST } from '@entities/user/model/actions';
import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_ID,
} from '@entities/user/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';
import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

export interface LeaveCoursePayloadInterface {
    courseId: number;
}

export interface LeaveCourseInterface {
    payload: LeaveCoursePayloadInterface;
}

export const leaveCourseRequest = createAsyncThunk<
    ErrorInterface,
    LeaveCourseInterface
>(POST_COURSE_REQUEST, async ({ payload }) => {
    try {
        const { courseId = DEFAULT_ID } = payload;

        const { data } = await instance.delete<ErrorInterface>(
            `${URL_MMT_STAND}explorer-cabinet/course/${courseId}`,
        );

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        noAuthHandler(error);

        if (error.response) {
            throw toast.error(error.response.data.errorMessage);
        }

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
});
