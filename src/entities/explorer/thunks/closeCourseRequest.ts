import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    DEFAULT_ID,
} from '@entities/user/model/constants';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { CLOSE_COURSE_REQUEST } from '../model/actions';


export interface CancelCoursePayloadInterface {
    requestId: number;
}

export interface CancelCourseInterface {
    payload: CancelCoursePayloadInterface;
}

export const closeCourseRequest = createAsyncThunk<
    ErrorInterface,
    CancelCourseInterface
>(CLOSE_COURSE_REQUEST, async ({
    payload,
}) => {
    try {
        const {
            requestId = DEFAULT_ID,
        } = payload;

        const {
            data,
        } = await instance.patch<ErrorInterface>(
            `${URL_MMT_STAND}course-registration-app/course-requests/${requestId}`,
        );

        return data;
    } catch (err) {
        throw onErrorHandler({
                err,
            })
    }
});
