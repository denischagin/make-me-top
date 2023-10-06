import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { POST_COURSE_REQUEST } from '@entities/user/model/actions';
import {
    DEFAULT_ID,
} from '@entities/user/model/constants';

import { onErrorHandler } from '@shared/api';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';


export interface LeaveCoursePayloadInterface {
    explorerId: number;
}

export interface LeaveCourseInterface {
    payload: LeaveCoursePayloadInterface;
    onSuccess?: () => any
    onError?: (error: ErrorInterface) => any
}

export const leaveCourseRequest = createAsyncThunk<
    ErrorInterface,
    LeaveCourseInterface
>(POST_COURSE_REQUEST, async ({
    payload,
    onSuccess,
    onError
}) => {
    try {
        const {
            explorerId = DEFAULT_ID,
        } = payload;

        const {
            data,
        } = await instance.delete<ErrorInterface>(
            `${URL_MMT_STAND}explorer-app/explorers/${explorerId}`,
        );

        onSuccess && onSuccess()
        return data;
    } catch (err) {
        onError && onError(err as ErrorInterface) 
        throw onErrorHandler({
            err,
        });
    }
});
