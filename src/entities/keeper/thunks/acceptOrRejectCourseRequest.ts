import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { DEFAULT_ID } from '@entities/user/model/constants';

import { onErrorHandler } from '@shared/api';

import { instance } from '@shared/api/instances';

import {
    TOAST_SUCCESS_APPROVED,
    TOAST_SUCCESS_REJECTED,
} from '@shared/constants/toastTitles';
import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { ACCEPT_OR_REJECT_COURSE } from '../model/actions';


export interface RejectCoursePayloadInterface {
    approved: boolean;
}

export interface RejectCourseInterface {
    requestId: number;
    rejection: RejectCoursePayloadInterface;
}

export const acceptOrRejectCourseRequest = createAsyncThunk<
    ErrorInterface,
    RejectCourseInterface
>(ACCEPT_OR_REJECT_COURSE, async (payload) => {
    try {
        const {
            requestId = DEFAULT_ID,
            rejection,
        } = payload;

        const {
            data,
        } = await instance.patch<ErrorInterface>(
            `${URL_MMT_STAND}course-registration-app/course-requests/${requestId}`,
            rejection,
        );

        if (payload.rejection.approved) {
            toast(TOAST_SUCCESS_APPROVED, {
                icon: '🤩',
            });

            return data;
        }

        toast(TOAST_SUCCESS_REJECTED, {
            icon: '😔',
        });

        return data;
    } catch (err) {
        throw onErrorHandler({
            err,
        });
    }
});
