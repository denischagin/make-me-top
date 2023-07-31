import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_COURSE } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { FETCH_COURSE } from '../model/actions';
import {
    DEFAULT_ERROR_MESSAGE,
    DEFAULT_ID,
} from '../model/constants';
import { CourseInfoInterface } from '../model/types';

interface GetCourseInfoInterface {
    courseId: number
}

export interface CourseResponseInterface extends CourseInfoInterface, ErrorInterface {

}

export const getCourseInfo = createAsyncThunk<CourseResponseInterface, GetCourseInfoInterface, { rejectValue: ErrorInterface }>(
    FETCH_COURSE,
    async (payload, {
        rejectWithValue,
    }) => {
        try {
            const {
                courseId = DEFAULT_ID,
            } = payload;

            const {
                data,
            } = await instance.get<CourseResponseInterface>(`${URL_MMT_STAND_COURSE}course-app/course/${courseId}`);

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
