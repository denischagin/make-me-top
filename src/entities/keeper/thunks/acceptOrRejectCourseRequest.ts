import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    POST_COURSE_REQUEST,
} from '@entities/user/model/actions';
import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_ID,
} from '@entities/user/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

export interface RejectCoursePayloadInterface {
    approved: boolean,
}

export interface RejectCourseInterface {
    requestId: number,
    rejection: RejectCoursePayloadInterface
}

export const acceptOrRejectCourseRequest = createAsyncThunk<ErrorInterface, RejectCourseInterface>(
    POST_COURSE_REQUEST,
    async (
        payload,
    ) => {
        try {
            const {
                requestId = DEFAULT_ID,
                rejection,
            } = payload;

            const {
                data,
            } = await instance.patch<ErrorInterface>(`${URL_MMT_STAND}keeper-cabinet/course-request/${requestId}`, rejection);

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